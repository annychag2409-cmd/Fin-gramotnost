
(function () {
  function validateNumber(value, rules) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Введите число.";
    }
    if (rules.min !== undefined && number < rules.min) {
      return `Минимальное значение: ${rules.min}.`;
    }
    if (rules.max !== undefined && number > rules.max) {
      return `Максимальное значение: ${rules.max}.`;
    }

    return "";
  }

  function showFieldError(field, message) {
    let error = field.parentElement.querySelector(".field-error");

    if (!error) {
      error = document.createElement("span");
      error.className = "field-error";
      field.parentElement.append(error);
    }

    error.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateProductForm(form) {
    const amount = form.elements.amount;
    const months = form.elements.months;
    const errors = {
      amount: validateNumber(amount.value, {
        min: Number(amount.min || 1),
        max: amount.max ? Number(amount.max) : undefined
      }),
      months: validateNumber(months.value, {
        min: Number(months.min || 1),
        max: Number(months.max || 60)
      })
    };

    showFieldError(amount, errors.amount);
    showFieldError(months, errors.months);

    return !errors.amount && !errors.months;
  }

  function bindValidation(selector) {
    document.querySelectorAll(selector).forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!validateProductForm(form)) {
          event.preventDefault();
        }
      }, true);

      form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => validateProductForm(form));
      });
    });
  }

  window.release5ProductValidation = {
    bindValidation,
    validateProductForm
  };

  bindValidation("#depositCalcForm, #savingsCalcForm");
})();
