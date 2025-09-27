// //app.js

// let listProducts = [];
// let carts = [];

// const cartTab = document.getElementById("cartTab");
// const overlay = document.getElementById("overlay");
// const listCartHTML = document.querySelector(".listCart");
// const productsList = document.getElementById("productsList");

// // ================== GLOBAL CART COUNT SYNC ==================
// const updateCartCount = () => {
//   const cartCountElements = document.querySelectorAll("#cartCount");
//   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   const totalUniqueProducts = savedCart.length;

//   cartCountElements.forEach(el => {
//     el.innerText = totalUniqueProducts;
//   });
// };

// // ================== STORAGE SYNC ACROSS TABS ==================
// window.addEventListener("storage", (e) => {
//   if (e.key === "cart") {
//     updateCartCount();
//   }
// });

// // ================== GLOBAL EVENTS ==================
// document.addEventListener("click", (e) => {
//   const target = e.target;

//   // Open cart
//   if (target.closest("#icon-cart")) {
//     cartTab.classList.add("active");
//     overlay.classList.add("active");
//   }

//   // Close cart
//   if (target.closest("#close-cart") || target.closest("#overlay")) {
//     cartTab.classList.remove("active");
//     overlay.classList.remove("active");
//   }

//   // Remove item
//   if (target.classList.contains("cart-remove")) {
//     const productId = target.dataset.id;
//     carts = carts.filter(c => c.product_id != productId);
//     saveCart();
//     renderCartItems();
//   }

//   // Checkout
//   if (target.classList.contains("checkout")) {
//     if (carts.length === 0) {
//       alert("Your cart is empty.");
//     } else {
//       saveCart();
//       window.location.href = "checkout.html";
//     }
//   }

//   // Add to Cart
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
//     alert(`${product.name} quantity updated in cart!`);
//   } else {
//     carts.push({ product_id: product_id, quantity });
//     alert(`${product.name} has been added to your cart!`);
//   }

//   saveCart();
//   renderCartItems();
// };

// // ================== SAVE TO STORAGE ==================
// const saveCart = () => {
//   localStorage.setItem("cart", JSON.stringify(carts));
//   updateCartCount();
// };

// // ================== RENDER CART ==================
// const renderCartItems = () => {
//   listCartHTML.innerHTML = "";
//   let totalPrice = 0;

//   if (carts.length === 0) {
//     const emptyMessage = document.createElement("div");
//     emptyMessage.className = "emptyCartMessage";
//     emptyMessage.textContent = "Your cart is empty.";
//     listCartHTML.appendChild(emptyMessage);
//   }

//   carts.forEach(cart => {
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

//   if (carts.length > 0) {
//     const totalDiv = document.createElement("div");
//     totalDiv.className = "cartTotal";
//     totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
//     listCartHTML.appendChild(totalDiv);
//   }

//   updateCartCount();
// };

// // ================== RENDER PRODUCT LIST ==================
// const renderProductList = () => {
//   productsList.innerHTML = "";
//   listProducts.forEach(product => {
//     const item = document.createElement("div");
//     item.classList.add("item");
//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

//     item.innerHTML = `
//       <img src="${firstImage}" alt="${product.name}">
//       <h3>${product.name}</h3>
//       <div class="cardLayout">
//         <button class="ri-shopping-cart-line AddCart" data-id="${product.id}"></button>
//         <div class="price">Price: $${product.price}</div>
//         <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
//       </div>
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
//       updateCartCount();
//     })
//     .catch(() => {
//       console.error("❌ Failed to load products.json");
//     });
// };

// initCart();
// window.addToCart = addToCart;













let listProducts = [];
let carts = [];
let visibleCount = 20;

const cartTab = document.getElementById("cartTab");
const overlay = document.getElementById("overlay");
const listCartHTML = document.querySelector(".listCart");
const productsList = document.getElementById("productsList");

// ================== GLOBAL CART COUNT SYNC ==================
const updateCartCount = () => {
  const cartCountElements = document.querySelectorAll("#cartCount");
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalUniqueProducts = savedCart.length;

  cartCountElements.forEach(el => {
    el.innerText = totalUniqueProducts;
  });
};

// ================== STORAGE SYNC ACROSS TABS ==================
window.addEventListener("storage", (e) => {
  if (e.key === "cart") {
    updateCartCount();
  }
});

// ================== GLOBAL EVENTS ==================
document.addEventListener("click", (e) => {
  const target = e.target;

  // Open cart
  if (target.closest("#icon-cart")) {
    cartTab.classList.add("active");
    overlay.classList.add("active");
  }

  // Close cart
  if (target.closest("#close-cart") || target.closest("#overlay")) {
    cartTab.classList.remove("active");
    overlay.classList.remove("active");
  }

  // Remove item
  if (target.classList.contains("cart-remove")) {
    const productId = target.dataset.id;
    carts = carts.filter(c => c.product_id != productId);
    saveCart();
    renderCartItems();
  }

  // Checkout
  if (target.classList.contains("checkout")) {
    if (carts.length === 0) {
      alert("Your cart is empty.");
    } else {
      saveCart();
      window.location.href = "checkout.html";
    }
  }

  // Add to Cart
  if (target.classList.contains("AddCart")) {
    const productId = target.dataset.id;
    if (productId) {
      addToCart(productId, 1);
    }
  }
});

// ================== QUANTITY UPDATE ==================
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("quantity")) {
    const productId = e.target.dataset.id;
    let newQty = parseInt(e.target.value);
    if (isNaN(newQty) || newQty < 1) newQty = 1;

    const cartItem = carts.find(c => c.product_id == productId);
    if (cartItem) {
      cartItem.quantity = newQty;
      saveCart();
      renderCartItems();
    }
  }
});

// ================== ADD TO CART ==================
const addToCart = (product_id, quantity = 1) => {
  const product = listProducts.find(p => p.id == product_id);
  if (!product) return;

  const existing = carts.find(c => c.product_id == product_id);
  if (existing) {
    existing.quantity += quantity;
    alert(`${product.name} quantity updated in cart!`);
  } else {
    carts.push({ product_id: product_id, quantity });
    alert(`${product.name} has been added to your cart!`);
  }

  saveCart();
  renderCartItems();
};

// ================== SAVE TO STORAGE ==================
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
  updateCartCount();
};

// ================== RENDER CART ==================
const renderCartItems = () => {
  listCartHTML.innerHTML = "";
  let totalPrice = 0;

  if (carts.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "emptyCartMessage";
    emptyMessage.textContent = "Your cart is empty.";
    listCartHTML.appendChild(emptyMessage);
  }

  carts.forEach(cart => {
    const product = listProducts.find(p => p.id == cart.product_id);
    if (!product) return;

    totalPrice += product.price * cart.quantity;
    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

    const cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.innerHTML = `
      <div class="image"><img src="${firstImage}" alt="${product.name}"></div>
      <div class="name">${product.name}</div>
      <div class="totalPrice">$${(product.price * cart.quantity).toFixed(2)}</div>
      <input type="number" value="${cart.quantity}" min="1" class="quantity" data-id="${product.id}" style="max-width:60px;">
      <i class="ri-delete-bin-6-fill cart-remove" data-id="${product.id}" style="cursor:pointer;"></i>
    `;
    listCartHTML.appendChild(cartItem);
  });

  if (carts.length > 0) {
    const totalDiv = document.createElement("div");
    totalDiv.className = "cartTotal";
    totalDiv.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    listCartHTML.appendChild(totalDiv);
  }

  updateCartCount();
};

// ================== RENDER PRODUCT LIST WITH SHOW MORE ==================
const renderProductList = () => {
  productsList.innerHTML = "";

  const visibleProducts = listProducts.slice(0, visibleCount);
  visibleProducts.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("item");
    const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;

    item.innerHTML = `
      <img src="${firstImage}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="cardLayout">
        <button class="ri-shopping-cart-line AddCart" data-id="${product.id}"></button>
        <div class="price">Price: $${product.price}</div>
        <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
      </div>
    `;
    productsList.appendChild(item);
  });

  if (visibleCount < listProducts.length) {
    const showMoreBtn = document.createElement("button");
    showMoreBtn.textContent = "Show More";
    showMoreBtn.className = "showMoreBtn";
    showMoreBtn.style.margin = "20px auto"; //to set width 
    showMoreBtn.style.display = "block";
    showMoreBtn.style.padding = "10px 20px";
    showMoreBtn.style.cursor = "pointer";
    
    
    

    // showMoreBtn.addEventListener("click", () => {
    //   visibleCount += 20;
    //   renderProductList();
    // });

    // productsList.appendChild(showMoreBtn);


    const parentContainer = productsList.parentElement; 
    parentContainer.style.display = "grid";
    parentContainer.style.gridTemplateColumns = "1fr";

      

    if (parentContainer) {
        // Append the button to the parent, making it a sibling to productsList, 
        // which puts it outside the product cards layout.
        parentContainer.appendChild(showMoreBtn); 
    } else {
        // Fallback: If productsList is a direct child of <body> (unlikely, but possible)
        document.body.appendChild(showMoreBtn);
    }
  }
};

// ================== INIT CART ==================
const initCart = () => {
  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      listProducts = data;
      renderProductList();
      const saved = localStorage.getItem("cart");
      if (saved) {
        carts = JSON.parse(saved);
      }
      renderCartItems();
      updateCartCount();
    })
    .catch(() => {
      console.error("❌ Failed to load products.json");
    });
};

initCart();
window.addToCart = addToCart;

