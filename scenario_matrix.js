(function () {
  const root = document.querySelector("[data-scenario-matrix]");

  if (!root) {
    return;
  }

  const form = root.querySelector(".scenario-matrix__form");
  const result = root.querySelector("[data-scenario-result]");

  const recommendations = {
    savings: {
      label: "Накопительный счет",
      reason: "Подходит, когда деньги должны оставаться доступными, а цель связана с резервом или коротким горизонтом.",
      checklist: "Проверьте период начисления процентов, условия повышенной ставки и правила по минимальному остатку."
    },
    deposit: {
      label: "Вклад",
      reason: "Подходит, если дата цели примерно известна и вы готовы не трогать деньги ради фиксированной ставки.",
      checklist: "Проверьте капитализацию, досрочное закрытие, пополнение, снятие и страховой лимит."
    },
    investment: {
      label: "Инвестиции",
      reason: "Подходят для долгого срока после формирования финансовой подушки и понимания рыночного риска.",
      checklist: "Проверьте комиссии, налоги, ликвидность инструмента и возможную просадку капитала."
    }
  };

  function scoreScenario(data) {
    const score = {
      savings: 0,
      deposit: 0,
      investment: 0
    };

    if (data.goal === "reserve") score.savings += 2;
    if (data.goal === "purchase") score.deposit += 2;
    if (data.goal === "capital") score.investment += 2;

    if (data.term === "anytime") score.savings += 2;
    if (data.term === "year") score.deposit += 2;
    if (data.term === "long") score.investment += 2;

    if (data.risk === "low") score.deposit += 1;
    if (data.risk === "low") score.savings += 1;
    if (data.risk === "medium") score.savings += 2;
    if (data.risk === "high") score.investment += 2;

    return Object.entries(score).sort((first, second) => second[1] - first[1])[0][0];
  }

  function renderRecommendation(productKey) {
    const item = recommendations[productKey];

    result.innerHTML = `
      <span>Рекомендуемый первый шаг</span>
      <h3>${item.label}</h3>
      <p>${item.reason}</p>
      <p>${item.checklist}</p>
    `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    renderRecommendation(scoreScenario(data));
  });
})();
