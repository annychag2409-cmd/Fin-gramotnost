(function () {
  const root = document.querySelector("[data-learning-report]");

  if (!root) {
    return;
  }

  const stats = root.querySelector("[data-learning-report-stats]");
  const list = root.querySelector("[data-learning-report-list]");
  const refreshButton = root.querySelector("[data-learning-report-refresh]");

  function getCompletedLessons() {
    return JSON.parse(localStorage.getItem("completedLessons") || "[]");
  }

  function getQuizResults() {
    return JSON.parse(localStorage.getItem("release4QuizResults") || "[]");
  }

  function renderReport() {
    const completed = getCompletedLessons();
    const quizResults = getQuizResults();
    const average = quizResults.length
      ? Math.round(quizResults.reduce((sum, item) => sum + Number(item.percent || 0), 0) / quizResults.length)
      : 0;

    stats.innerHTML = `
      <span>Уроки: ${Math.max(completed.length, quizResults.length)}</span>
      <span>Завершено: ${completed.length}</span>
      <span>Средний результат: ${average}%</span>
    `;

    if (!completed.length && !quizResults.length) {
      list.innerHTML = '<p class="calculation-history__empty">Данных по обучению пока нет.</p>';
      return;
    }

    list.innerHTML = completed.map((lessonId) => `
      <article class="learning-report__item">
        <div>
          <strong>Урок ${lessonId}</strong>
          <p>Отмечен как завершенный в этом браузере.</p>
        </div>
        <span>Готово</span>
      </article>
    `).join("");
  }

  refreshButton.addEventListener("click", renderReport);
  renderReport();
})();
