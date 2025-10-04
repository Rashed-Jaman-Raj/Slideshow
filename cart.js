

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const cartTab = document.getElementById("cartTab");
  const closeCartBtn = document.getElementById("close-cart");
  const listCart = document.querySelector(".listCart");
  const checkoutBtn = document.querySelector(".checkout");

  // Only run cart logic if cartTab exists on this page
  if (cartTab && overlay && closeCartBtn && listCart && checkoutBtn) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
      listCart.innerHTML = "";
      if (cart.length === 0) {
        listCart.innerHTML = `<div style="text-align:center; padding:20px;">Your cart is empty</div>`;
        return;
      }

      cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "item";
        cartItem.innerHTML = `
          <div class="image"><img src="${item.image}" alt=""></div>
          <div class="name">${item.name}</div>
          <div class="totalPrice">$${item.price * item.quantity}</div>
          <input style="max-width: 60px;" type="number" value="${item.quantity}" min="1" class="quantity" data-index="${index}">
          <i class="ri-delete-bin-6-fill cart-remove" data-index="${index}"></i>
        `;
        listCart.appendChild(cartItem);
      });
    }

    function openCart() {
      overlay.classList.add("active");
      cartTab.classList.add("active");
    }

    function closeCart() {
      overlay.classList.remove("active");
      cartTab.classList.remove("active");
    }

    overlay.addEventListener("click", closeCart);
    closeCartBtn.addEventListener("click", closeCart);

    listCart.addEventListener("click", e => {
      if (e.target.classList.contains("cart-remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });

    listCart.addEventListener("input", e => {
      if (e.target.classList.contains("quantity")) {
        const index = e.target.dataset.index;
        const qty = parseInt(e.target.value) || 1;
        cart[index].quantity = qty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });

    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
    });

    renderCart();
  }

  // Global Add to Cart binding (works on all pages)
  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const productEl = e.target.closest(".product");
      if (!productEl) return;

      const product = {
        id: productEl.dataset.id,
        name: productEl.querySelector(".product-name")?.textContent || "Unnamed",
        price: parseFloat(productEl.querySelector(".product-price")?.textContent.replace("$", "") || "0"),
        image: productEl.querySelector("img")?.src || ""
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      // If cartTab exists, re-render and open
      if (document.getElementById("cartTab")) {
        renderCart();
        openCart();
      }
    }
  });
});


   document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cartCount");
    if (!cartCount) return;

    const syncCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCount.textContent = cart.length;
    };

    syncCartCount();

    // Optional: update count if cart changes in another tab
    window.addEventListener("storage", syncCartCount);
  });

  window.syncCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
};