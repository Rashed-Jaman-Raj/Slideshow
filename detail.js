

// let listProducts = [];
// let carts = JSON.parse(localStorage.getItem("cart")) || [];

// // ========== GLOBAL CART COUNT ==========
// const updateCartCount = () => {
//   const cartCountElements = document.querySelectorAll("#cartCount");
//   cartCountElements.forEach(el => el.innerText = carts.length);
// };

// // ========== ADD TO CART ==========
// const addToCart = (product_id, quantity = 1) => {
//   const product = listProducts.find(p => p.id == product_id);
//   if (!product) return;

//   const existing = carts.find(c => c.product_id == product_id);
//   if (existing) {
//     existing.quantity += quantity;
//     alert(`${product.name} quantity updated!`);
//   } else {
//     carts.push({ product_id, quantity });
//     alert(`${product.name} added to cart!`);
//   }

//   localStorage.setItem("cart", JSON.stringify(carts));
//   updateCartCount();
// };

// window.addToCart = addToCart;

// // ========== FETCH PRODUCTS ==========
// const fetchProducts = () => {
//   return fetch("products.json")
//     .then(res => res.json())
//     .then(data => {
//       listProducts = data;
//     });
// };

// // ========== GET PRODUCT ID ==========
// const getProductIdFromURL = () => {
//   const params = new URLSearchParams(window.location.search);
//   return params.get("id");
// };

// // ========== RENDER HOMEPAGE ==========
// const renderHomepage = () => {
//   const productsList = document.getElementById("productsList");
//   if (!productsList) return;

//   productsList.innerHTML = "";
//   listProducts.forEach(product => {
//     const firstImage = Array.isArray(product.image) ? product.image[0] : product.image;
//     const item = document.createElement("div");
//     item.className = "item";
//     item.innerHTML = `
//       <img src="${firstImage}" alt="${product.name}" onclick="location.href='detail.html?id=${product.id}'">
//       <h3>${product.name}</h3>
//       <div class="price">Price: $${product.price}</div>
//       <button class="AddCart" data-id="${product.id}">Add to Cart</button>
//     `;
//     productsList.appendChild(item);
//   });
// };

// // ========== RENDER DETAIL PAGE ==========
// const renderDetailPage = () => {
//   const productId = getProductIdFromURL();
//   if (!productId) return;

//   const product = listProducts.find(p => p.id == productId);
//   if (!product) return;

//   const nameEl = document.getElementById("productName");
//   const priceEl = document.querySelector(".price");
//   const mainImageEl = document.getElementById("mainImage");
//   const detailEl = document.getElementById("product-desc");
//   const thumbnailsEl = document.querySelector(".thumbnails");
//   const addBtn = document.getElementById("AddCart");

//   if (nameEl) nameEl.innerText = product.name;
//   if (priceEl) priceEl.innerText = `$${product.price}`;
//   if (detailEl) detailEl.innerText = product.description || "No description available.";
//   if (mainImageEl) mainImageEl.src = Array.isArray(product.image) ? product.image[0] : product.image;

//   if (thumbnailsEl) {
//     thumbnailsEl.innerHTML = "";
//     const images = Array.isArray(product.image) ? product.image : [product.image];
//     images.forEach(src => {
//       const thumb = document.createElement("img");
//       thumb.src = src;
//       thumb.className = "small-img";
//       thumb.alt = "thumbnail";
//       thumb.style.width = "60px";
//       thumb.style.cursor = "pointer";
//       thumb.addEventListener("click", () => {
//         mainImageEl.src = src;
//       });
//       thumbnailsEl.appendChild(thumb);
//     });
//   }

//   if (addBtn) {
//     addBtn.addEventListener("click", () => {
//       const qtyInput = document.querySelector("input[type='number']");
//       const quantity = parseInt(qtyInput?.value) || 1;
//       addToCart(product.id, quantity);
//     });
//   }

//   // Similar Products
//   const similarList = document.querySelector(".similar-list");
//   if (similarList) {
//     similarList.innerHTML = "";
//     const keyword = product.name.split(" ")[0].toLowerCase();
//     const similarProducts = listProducts.filter(p =>
//       p.id != product.id &&
//       (p.type === product.type || p.name.toLowerCase().includes(keyword))
//     );

//     similarProducts.forEach(p => {
//       const firstImage = Array.isArray(p.image) ? p.image[0] : p.image;
//       const item = document.createElement("div");
//       item.className = "item";
//       item.innerHTML = `
//         <img src="${firstImage}" alt="${p.name}" onclick="location.href='detail.html?id=${p.id}'">
//         <h3>${p.name}</h3>
//         <div class="price">$${p.price}</div>
//         <button class="AddCart" data-id="${p.id}">Add to Cart</button>
//       `;
//       similarList.appendChild(item);
//     });
//   }
// };

// // ========== SIZE GUIDE POPUP ==========
// const setupSizeGuidePopup = () => {
//   const openPopup = document.getElementById("openSizeGuide") || document.getElementById("sizeGuideButton");
//   const popup = document.querySelector(".popup-content");
//   const closePopup = document.getElementById("closeSizeGuide");
//   const overlay = document.getElementById("popupOverlay");

//   if (openPopup && popup && closePopup && overlay) {
//     openPopup.addEventListener("click", () => {
//       popup.classList.add("active");
//       overlay.classList.add("active");
//     });

//     closePopup.addEventListener("click", () => {
//       popup.classList.remove("active");
//       overlay.classList.remove("active");
//     });

//     overlay.addEventListener("click", () => {
//       popup.classList.remove("active");
//       overlay.classList.remove("active");
//     });
//   }
// };

// // ========== GLOBAL CART TAB TOGGLE ==========
// const setupGlobalCartTab = () => {
//   const cartTab = document.getElementById("cartTab");
//   const overlay = document.getElementById("overlay");
//   const closeCartBtn = document.getElementById("close-cart");
//   const iconCart = document.getElementById("icon-cart");

//   if (!cartTab || !overlay || !closeCartBtn || !iconCart) return;

//   iconCart.addEventListener("click", () => {
//     cartTab.classList.add("active");
//     overlay.classList.add("active");
//   });

//   closeCartBtn.addEventListener("click", () => {
//     cartTab.classList.remove("active");
//     overlay.classList.remove("active");
//   });

//   overlay.addEventListener("click", () => {
//     cartTab.classList.remove("active");
//     overlay.classList.remove("active");
//   });
// };

// // ========== GLOBAL CLICK FOR ADD TO CART ==========
// document.addEventListener("click", (e) => {
//   const target = e.target;
//   if (target.classList.contains("AddCart")) {
//     const productId = target.dataset.id;
//     if (productId) addToCart(productId, 1);
//   }
// });

// // ========== INIT ==========
// document.addEventListener("DOMContentLoaded", () => {
//   fetchProducts().then(() => {
//     updateCartCount();
//     setupGlobalCartTab();
//     setupSizeGuidePopup();
//     renderHomepage();
//     renderDetailPage();
//   });
// });

// ====================================================


















