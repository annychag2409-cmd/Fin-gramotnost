
(function () {
  const panel = document.querySelector("[data-product-filter-panel]");

  if (!panel) {
    return;
  }

  const form = panel.querySelector(".product-filter-form");
  const countNode = panel.querySelector("[data-product-filter-count]");
  const favoritesNode = panel.querySelector("[data-product-filter-favorites]");
  const resetButton = panel.querySelector("[data-product-filter-reset]");
  const storageKey = "release3FavoriteProducts";

  function getCards() {
    return Array.from(document.querySelectorAll(".deposit-offer-card"));
  }

  function readFavorites() {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  }

  function saveFavorites(ids) {
    localStorage.setItem(storageKey, JSON.stringify(ids));
  }

  function getCardData(card) {
    const title = card.textContent.toLowerCase();
    const rateText = card.querySelector(".deposit-offer-card__metrics strong")?.textContent || "0";
    const amountText = card.querySelectorAll(".deposit-offer-card__metrics strong")[1]?.textContent || "0";

    return {
      id: card.dataset.depositId || card.dataset.savingsId || title,
      type: card.dataset.savingsId ? "savings" : "deposit",
      title,
      bank: card.querySelector(".deposit-offer-card__top strong")?.textContent || "",
      rate: Number(rateText.replace(/[^\d,.]/g, "").replace(",", ".")) || 0,
      amount: Number(amountText.replace(/[^\d]/g, "")) || 0
    };
  }

  function ensureFavoriteButtons() {
    const favorites = readFavorites();

    getCards().forEach((card) => {
      if (card.querySelector(".favorite-toggle")) {
        return;
      }

      const data = getCardData(card);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "favorite-toggle";
      button.textContent = favorites.includes(data.id) ? "В избранном" : "В избранное";
      button.classList.toggle("is-active", favorites.includes(data.id));

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const current = readFavorites();
        const next = current.includes(data.id)
          ? current.filter((item) => item !== data.id)
          : current.concat(data.id);

        saveFavorites(next);
        applyFilters();
      });

      card.append(button);
    });
  }

  function applyFilters() {
    ensureFavoriteButtons();

    const formData = new FormData(form);
    const query = String(formData.get("query") || "").trim().toLowerCase();
    const productType = formData.get("productType");
    const minRate = Number(formData.get("minRate") || 0);
    const sortBy = formData.get("sortBy");
    const favorites = readFavorites();
    const cards = getCards();
    let visibleCount = 0;

    cards
      .map((card) => ({ card, data: getCardData(card) }))
      .sort((first, second) => {
        if (sortBy === "amount_asc") {
          return first.data.amount - second.data.amount;
        }
        if (sortBy === "bank_asc") {
          return first.data.bank.localeCompare(second.data.bank, "ru");
        }
        return second.data.rate - first.data.rate;
      })
      .forEach(({ card, data }) => {
        const matchesQuery = !query || data.title.includes(query);
        const matchesType = productType === "all" || data.type === productType;
        const matchesRate = data.rate >= minRate;
        const isVisible = matchesQuery && matchesType && matchesRate;

        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }

        const favoriteButton = card.querySelector(".favorite-toggle");
        if (favoriteButton) {
          const isFavorite = favorites.includes(data.id);
          favoriteButton.textContent = isFavorite ? "В избранном" : "В избранное";
          favoriteButton.classList.toggle("is-active", isFavorite);
        }

        card.parentElement.append(card);
      });

    countNode.textContent = `${visibleCount} продуктов`;
    favoritesNode.textContent = `${favorites.length} в избранном`;
  }

  form.addEventListener("input", applyFilters);
  form.addEventListener("change", applyFilters);
  resetButton.addEventListener("click", () => {
    form.reset();
    applyFilters();
  });

  window.setTimeout(applyFilters, 350);
})();
