(function () {
  const root = document.querySelector("[data-source-monitor]");

  if (!root) {
    return;
  }

  const list = root.querySelector("[data-source-list]");
  const refreshButton = root.querySelector("[data-source-refresh]");
  const fallbackSources = [
    { bank: "Сбер", product: "Вклад", checked_at: "не проверено", status: "needs_check" },
    { bank: "Т-Банк", product: "Накопительный счет", checked_at: "не проверено", status: "needs_check" },
    { bank: "ВТБ", product: "Вклад", checked_at: "не проверено", status: "needs_check" }
  ];

  function renderSources(items) {
    list.innerHTML = items.map((item) => {
      const isOk = item.status === "ok";
      const label = isOk ? "Актуально" : "Нужно проверить";

      return `
        <article class="source-monitor__card">
          <span class="source-monitor__status ${isOk ? "" : "source-monitor__status--warning"}">${label}</span>
          <h3>${item.bank}</h3>
          <p>${item.product}</p>
          <p>Последняя проверка: ${item.checked_at}</p>
        </article>
      `;
    }).join("");
  }

  async function loadSources() {
    refreshButton.disabled = true;
    refreshButton.textContent = "Проверяем...";

    try {
      const response = await fetch("http://127.0.0.1:5000/api/release4/sources");
      if (!response.ok) {
        throw new Error("Sources request failed");
      }
      const data = await response.json();
      renderSources(data.items || fallbackSources);
    } catch (error) {
      renderSources(fallbackSources);
    } finally {
      refreshButton.disabled = false;
      refreshButton.textContent = "Проверить";
    }
  }

  refreshButton.addEventListener("click", loadSources);
})();
