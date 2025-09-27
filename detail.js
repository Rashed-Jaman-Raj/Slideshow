// detail.js

// Image switching
const thumbnails = document.querySelectorAll('.small-img');
const mainImage = document.getElementById('mainImage');

thumbnails.forEach(img => {
  img.addEventListener('click', () => {
    mainImage.src = img.src;
    thumbnails.forEach(i => i.style.opacity = '0.5');
    img.style.opacity = '1';
  });
});

// Size guide popup logic
const sizeGuideBtn = document.getElementById('sizeGuideButton');
const overlay = document.getElementById('overlay');
const popupContent = document.createElement('div');
popupContent.className = 'popup-content';
popupContent.innerHTML = `
  <i class="ri-close-large-fill popup-close" id="closeSizeGuide"></i>
  <h3>Size Guide</h3>
  <ul>
    <li>S – Chest 34–36", Waist 26–28"</li>
    <li>M – Chest 38–40", Waist 30–32"</li>
    <li>L – Chest 42–44", Waist 34–36"</li>
    <li>XL – Chest 46–48", Waist 38–40"</li>
    <li>XXL – Chest 48–50", Waist 40–42"</li>
  </ul>
  <p>For best fit, <br> compare with your favorite garment measurements!</p>
`;
popupContent.style.position = 'fixed';
popupContent.style.top = '50%';
popupContent.style.left = '50%';
popupContent.style.transform = 'translate(-50%, -50%)';
popupContent.style.background = 'white';
popupContent.style.padding = '20px';
popupContent.style.borderRadius = '8px';
popupContent.style.zIndex = '1001';
popupContent.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
popupContent.style.display = 'none';
document.body.appendChild(popupContent);

sizeGuideBtn.addEventListener('click', () => {
  overlay.style.display = 'block';
  popupContent.style.display = 'block';
});

popupContent.querySelector('#closeSizeGuide').addEventListener('click', () => {
  overlay.style.display = 'none';
  popupContent.style.display = 'none';
});

// Add to Cart logic
const addToCartBtn = document.getElementById('addToCartBtn');
addToCartBtn.addEventListener('click', () => {
  const name = document.getElementById('productName').textContent;
  const price = document.querySelector('.price').textContent;
  const imgSrc = mainImage.src;
  const quantity = document.querySelector('.productInfo input[type="number"]').value;
  const size = document.querySelector('.productInfo select').value;

  if (size === 'Select Size') {
    alert('Please select a size');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name && item.size === size);

  if (existing) {
    existing.quantity = parseInt(existing.quantity) + parseInt(quantity);
  } else {
    cart.push({ name, price, imgSrc, quantity, size });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
  updateCartCount();
});

// Cart count sync
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  const cartCountEl = document.querySelector('.cart-count');
  if (cartCountEl) cartCountEl.textContent = total;
}

// Cart tab open/close
const cartTab = document.getElementById('cartTab');
const closeCartBtn = document.getElementById('close-cart');

document.querySelectorAll('.AddCart').forEach(btn => {
  btn.addEventListener('click', () => {
    cartTab.style.right = '0';
    overlay.style.display = 'block';
  });
});

closeCartBtn.addEventListener('click', () => {
  cartTab.style.right = '-100%';
  overlay.style.display = 'none';
});

// Load cart items (optional enhancement)
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const listCart = document.querySelector('.listCart');
  listCart.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <div class="image"><img src="${item.imgSrc}" alt=""></div>
      <div class="name">${item.name} (${item.size})</div>
      <div class="totalPrice">${item.price}</div>
      <input style="max-width: 60px;" type="number" value="${item.quantity}" min="1" class="quantity">
      <i class="ri-delete-bin-6-fill cart-remove"></i>
    `;
    listCart.appendChild(div);
  });
}

loadCartItems();
updateCartCount();
