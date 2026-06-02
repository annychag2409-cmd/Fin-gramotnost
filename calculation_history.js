
(function () {
  const root = document.querySelector("[data-calculation-history]");

  if (!root) {
    return;
  }

  const list = root.querySelector("[data-history-list]");
  const clearButton = root.querySelector("[data-history-clear]");
  const storageKey = "release4CalculationHistory";
  const maxItems = 8;

  function readHistory() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  }

  function saveHistory(items) {
    localStorage.setItem(storageKey, JSON.stringify(items.slice(0, maxItems)));
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    }).format(Number(value) || 0);
  }

  function renderHistory() {
    const items = readHistory();

    if (!items.length) {
      list.innerHTML = '<p class="calculation-history__empty">Расчетов пока нет.</p>';
      return;
    }

    list.innerHTML = items.map((item) => `
      <article class="calculation-history__item">
        <div>
          <strong>${item.title}</strong>
          <span>${item.amountText} на ${item.months} мес., ставка ${item.rate}%</span>
          <span>${new Date(item.createdAt).toLocaleString("ru-RU")}</span>
        </div>
        <strong class="calculation-history__profit">${formatMoney(item.profit)}</strong>
      </article>
    `).join("");
  }

  function rememberCalculation(title, payload, result) {
    const items = readHistory();
    const nextItem = {
      title,
      amountText: formatMoney(payload.amount),
      months: payload.months,
      rate: result.annual_rate || result.rate || 0,
      profit: result.profit || 0,
      createdAt: new Date().toISOString()
    };

    saveHistory([nextItem].concat(items));
    renderHistory();
  }

  window.release4RememberCalculation = rememberCalculation;

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    renderHistory();
  });

  renderHistory();
})();
