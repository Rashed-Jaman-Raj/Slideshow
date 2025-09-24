

// let listProducts = [];
// let carts = [];

// // DOM references
// const cartTab = document.getElementById("cartTab");
// const overlay = document.getElementById("overlay");
// const listCartHTML = document.querySelector(".listCart");
// const cartCount = document.getElementById("cartCount");
// const productsList = document.getElementById("productsList");

// // ================== GLOBAL EVENTS ==================
// document.addEventListener("click", (e) => {
//   const target = e.target;

//   // ====== Open cart (global) ======
//   if (target.closest("#icon-cart")) {
//     cartTab.classList.add("active");
//     overlay.classList.add("active");
//   }

//   // ====== Close cart (global) ======
//   if (target.closest("#close-cart") || target.closest("#overlay")) {
//     cartTab.classList.remove("active");
//     overlay.classList.remove("active");
//   }

//   // ====== Remove item ======
//   if (target.classList.contains("cart-remove")) {
//     const productId = target.dataset.id;
//     carts = carts.filter(c => c.product_id != productId);
//     saveCart();
//     renderCartItems();
//   }

//   // ====== Checkout button ======
//   if (target.classList.contains("checkout")) {
//     if (carts.length === 0) {
//       alert("Your cart is empty.");
//     } else {
//       saveCart();
//       window.location.href = "checkout.html";
//     }
//   }

//   // ====== Add to Cart (works anywhere on page) ======
//   if (target.classList.contains("AddCart")) {
//     const productId = target.dataset.id;
//     if (productId) {
//       addToCart(productId, 1);
//     }
//   }
// });

// // ================== QUANTITY UPDATE ==================
// document.addEventListener("change", (e) => {
//   if (e.target.classList.contains("quantity")) {
//     const productId = e.target.dataset.id;
//     let newQty = parseInt(e.target.value);
//     if (isNaN(newQty) || newQty < 1) newQty = 1;

//     const cartItem = carts.find(c => c.product_id == productId);
//     if (cartItem) {
//       cartItem.quantity = newQty;
//       saveCart();
//       renderCartItems();
//     }
//   }
// });

// // ================== ADD TO CART ==================
// const addToCart = (product_id, quantity = 1) => {
//   const product = listProducts.find(p => p.id == product_id);
//   if (!product) return;

//   const existing = carts.find(c => c.product_id == product_id);
//   if (existing) {
//     existing.quantity += quantity;
//   } else {
//     carts.push({ product_id: product_id, quantity });
//   }

//   alert(`${product.name} has been added to your cart!`);
//   saveCart();
//   renderCartItems();
// };

// // ================== SAVE TO STORAGE ==================
// const saveCart = () => {
//   localStorage.setItem("cart", JSON.stringify(carts));
// };

// // ================== RENDER CART ==================
// const renderCartItems = () => {
//   listCartHTML.innerHTML = "";
//   let totalUniqueProducts = 0;
//   let totalPrice = 0;

//   if (carts.length === 0) {
//     const emptyMessage = document.createElement("div");
//     emptyMessage.className = "emptyCartMessage";
//     emptyMessage.textContent = "Your cart is empty.";
//     listCartHTML.appendChild(emptyMessage);
//   }

//   carts.forEach(cart => {
//     totalUniqueProducts++;
//     const product = listProducts.find(p => p.id == cart.product_id);
//     if (!product) return;

//     totalPrice += product.price * cart.quantity;
//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     const cartItem = document.createElement("div");
//     cartItem.classList.add("item");
//     cartItem.innerHTML = `
//       <div class="image"><img src="${firstImage}" alt="${product.name}"></div>
//       <div class="name">${product.name}</div>
//       <div class="totalPrice">$${(product.price * cart.quantity).toFixed(2)}</div>
//       <input type="number" value="${cart.quantity}" min="1" class="quantity" data-id="${product.id}" style="max-width:60px;">
//       <i class="ri-delete-bin-6-fill cart-remove" data-id="${product.id}" style="cursor:pointer;"></i>
//     `;
//     listCartHTML.appendChild(cartItem);
//   });

//   // Update cart count (badge)
//   if (cartCount) {
//     cartCount.innerText = totalUniqueProducts;
//   }

//   // Add total price section
//   if (carts.length > 0) {
//     const totalDiv = document.createElement("div");
//     totalDiv.className = "cartTotal";
//     totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
//     listCartHTML.appendChild(totalDiv);
//   }
// };

// // ================== RENDER PRODUCT LIST ==================
// const renderProductList = () => {
//   if (!productsList) return;
//   productsList.innerHTML = "";

//   listProducts.forEach(product => {
//     const item = document.createElement("div");
//     item.classList.add("item");
//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     item.innerHTML = `
//       <img src="${firstImage}" alt="${product.name}">
//       <h3>${product.name}</h3>
//       <div class="price">$${product.price}</div>
//       <button class="AddCart" data-id="${product.id}">Add to Cart</button>
//     `;
//     productsList.appendChild(item);
//   });
// };

// // ================== INIT CART ==================
// const initCart = () => {
//   fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       listProducts = data;
//       renderProductList();
//       const saved = localStorage.getItem("cart");
//       if (saved) {
//         carts = JSON.parse(saved);
//       }
//       renderCartItems();
//     })
//     .catch(() => {
//       console.error("❌ Failed to load products.json");
//     });
// };

// initCart();

// // Expose globally
// window.addToCart = addToCart;
// window.renderCartItems = renderCartItems;



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