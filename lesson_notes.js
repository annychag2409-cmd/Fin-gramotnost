(function () {
  const root = document.querySelector("[data-lesson-notes]");

  if (!root) {
    return;
  }

  const lessonId = root.dataset.lessonId || window.location.pathname;
  const storageKey = `release3LessonNotes:${lessonId}`;
  const goal = root.querySelector("[data-lesson-goal]");
  const note = root.querySelector("[data-lesson-note]");
  const understood = root.querySelector("[data-lesson-understood]");
  const status = root.querySelector("[data-lesson-notes-status]");
  const clearButton = root.querySelector("[data-lesson-notes-clear]");

  function readState() {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  }

  function saveState() {
    const state = {
      goal: goal.value.trim(),
      note: note.value.trim(),
      understood: understood.checked,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(storageKey, JSON.stringify(state));
    status.textContent = "Сохранено.";
  }

  function restoreState() {
    const state = readState();
    goal.value = state.goal || "";
    note.value = state.note || "";
    understood.checked = Boolean(state.understood);
  }

  [goal, note, understood].forEach((field) => {
    field.addEventListener("input", saveState);
    field.addEventListener("change", saveState);
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    goal.value = "";
    note.value = "";
    understood.checked = false;
    status.textContent = "Заметки очищены.";
  });

  restoreState();
})();
