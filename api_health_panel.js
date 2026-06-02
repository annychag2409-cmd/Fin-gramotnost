(function () {
  const root = document.querySelector("[data-api-health-panel]");

  if (!root) {
    return;
  }

  const list = root.querySelector("[data-api-health-list]");
  const button = root.querySelector("[data-api-health-check]");
  const endpoints = [
    ["Health", "http://127.0.0.1:5000/api/health"],
    ["Вклады", "http://127.0.0.1:5000/api/deposits"],
    ["Счета", "http://127.0.0.1:5000/api/savings"],
    ["Предложения", "http://127.0.0.1:5000/api/offers"]
  ];

  async function checkEndpoint(name, url) {
    const startedAt = performance.now();

    try {
      const response = await fetch(url);
      const time = Math.round(performance.now() - startedAt);
      return { name, ok: response.ok, status: response.status, time };
    } catch (error) {
      return { name, ok: false, status: "нет ответа", time: 0 };
    }
  }

  function renderResults(results) {
    list.innerHTML = results.map((item) => `
      <article class="api-health-card ${item.ok ? "" : "api-health-card--bad"}">
        <strong>${item.name}</strong>
        <span>${item.ok ? "Работает" : "Ошибка"}: ${item.status}</span>
        <span>${item.time ? `${item.time} мс` : "время недоступно"}</span>
      </article>
    `).join("");
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Проверяем...";
    renderResults(await Promise.all(endpoints.map(([name, url]) => checkEndpoint(name, url))));
    button.disabled = false;
    button.textContent = "Проверить";
  });
})();
