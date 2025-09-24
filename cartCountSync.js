
(function () {
  // Wait until DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    ensureCartCountReady();
  });

  // Sync across tabs/windows
  window.addEventListener("storage", (e) => {
    if (e.key === "cart") {
      updateCartCount();
    }
  });

  // Retry logic to ensure cartCount element is present
  function ensureCartCountReady(retries = 10) {
    const interval = setInterval(() => {
      const cartCountElements = document.querySelectorAll("#cartCount");
      if (cartCountElements.length > 0 || retries <= 0) {
        clearInterval(interval);
        updateCartCount();
      }
      retries--;
    }, 100); // Retry every 100ms
  }

  // Update cart count from localStorage
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll("#cartCount");
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalUniqueProducts = savedCart.length;

    cartCountElements.forEach(el => {
      el.textContent = totalUniqueProducts;
    });
  }

  // Optional: expose globally
  window.updateCartCount = updateCartCount;
})();
