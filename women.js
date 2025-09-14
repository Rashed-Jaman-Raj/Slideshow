 document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsList');
  const sidebarLinks = document.querySelectorAll('.sideBar a');
  let allProducts = [];

  // Define valid types from sidebar
  const validTypes = [
    "Top", "Kaftan", "Gown", "Shari",
    "Water Bottle", "Hand Bag", "Finger Ring", "Jump Suit", "Women Bangals", "Long Tunic", "Ear Ring", "Tunic With Shrug", "Women Shoes", "Top Buttom Set", "Socks", "Koti"
  ];

  // Load products
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderMenProducts(); // Default load: all men products
    })
    .catch(err => {
      console.error("Failed to load products.json:", err);
      container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
    });

  // ✅ Render all "men" products
  function renderMenProducts() {
    container.innerHTML = '';
    const menProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'women');

    menProducts.forEach(product => {
      const item = document.createElement('div');
      item.className = 'item';
      const mainImage = product.image?.[0] || 'placeholder.jpg';
      item.innerHTML = `
        <img src="${mainImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">Price: $${product.price}</div>
        <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
        <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
      `;
      container.appendChild(item);
    });
  }

  // ✅ Render by sidebar type, including "Others"
  function renderProductsByType(type) {
    container.innerHTML = '';

    const menProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'women');

    const filtered = menProducts.filter(product => {
      const productType = product.type?.trim();
      if (type === 'Others') {
        return !validTypes.includes(productType);
      } else {
        return productType === type;
      }
    });


    if (filtered.length === 0) {
  container.innerHTML = `
    <h3 style="
      padding-top: 8rem;
      width: 800px;
      color: gray;
      font-size: 25px;
      font-weight: 600;
      text-align: center;
      margin-top: 30px;
      font-family: 'Segoe UI', sans-serif;
    ">
      No products found for "${type}"
    </h3>
  `;
  return;
}

    filtered.forEach(product => {
      const item = document.createElement('div');
      item.className = 'item';
      const mainImage = product.image?.[0] || 'placeholder.jpg';
      item.innerHTML = `
        <img src="${mainImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">Price: $${product.price}</div>
        <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
        <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
      `;
      container.appendChild(item);
    });
  }

  // ✅ Handle sidebar clicks
  sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const type = link.getAttribute('data-category');
      renderProductsByType(type);
    });
  });
});