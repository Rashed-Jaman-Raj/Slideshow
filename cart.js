//cart.js
//Shopping Cart Start==============
function setupCartToggle() {
  const iconCart = document.getElementById("icon-cart");
  const closeCart = document.getElementById("close-cart");
  const cartTab = document.getElementById("cartTab");

  if (!iconCart || !closeCart || !cartTab) return; // Exit if any element is missing

  iconCart.addEventListener("click", () => {
    cartTab.classList.add("active");
    // document.querySelector(".overlay")?.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartTab.classList.remove("active");
    // document.querySelector(".overlay")?.classList.remove("active");
  });
}

// Wait for DOM and header injection
document.addEventListener("DOMContentLoaded", () => {
  const interval = setInterval(() => {
    const iconCart = document.getElementById("icon-cart");
    const closeCart = document.getElementById("close-cart");
    const cartTab = document.getElementById("cartTab");

    if (iconCart && closeCart && cartTab) {
      clearInterval(interval);
      setupCartToggle();
    }
  }, 100); // Check every 100ms until header is ready
});


