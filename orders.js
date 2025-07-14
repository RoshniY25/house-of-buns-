document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const totalPriceEl = document.getElementById("total-price");
  const summaryList = document.getElementById("summary-list");

  const modal = document.querySelector(".order-success-modal");

  function updateSummary() {
    let total = 0;
    summaryList.innerHTML = "";

    // All selected burgers
    const selectedBurgers = document.querySelectorAll(".burger-check:checked");
    selectedBurgers.forEach(burger => {
      const burgerItem = burger.closest(".burger-item");
      const name = burgerItem.dataset.name;
      const price = parseInt(burgerItem.dataset.price);
      total += price;

      const li = document.createElement("li");
      li.textContent = `${name} - ₹${price}`;
      summaryList.appendChild(li);

      // Extras
      const extras = burgerItem.querySelectorAll(".extra-check:checked");
      extras.forEach(extra => {
        const extraName = extra.dataset.name;
        const extraPrice = parseInt(extra.dataset.price);
        total += extraPrice;

        const extraItem = document.createElement("li");
        extraItem.textContent = `+ ${extraName} - ₹${extraPrice}`;
        extraItem.style.fontSize = "0.95rem";
        extraItem.style.marginLeft = "1rem";
        summaryList.appendChild(extraItem);
      });
    });

    totalPriceEl.textContent = total;
  }

  // Track changes on all checkboxes
  document.querySelectorAll("input[type='checkbox']").forEach(input => {
    input.addEventListener("change", updateSummary);
  });

  // Submit with modal popup
  form.addEventListener("submit", e => {
    e.preventDefault();
    updateSummary();

    // Show modal
    modal.classList.add("show");

    // Reset form after short delay
    setTimeout(() => {
      form.reset();
      updateSummary();
      modal.classList.remove("show");
    }, 3000);
  });

  updateSummary();
});
