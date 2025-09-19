
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsList');
  const sidebarLinks = document.querySelectorAll('.sideBar a');
  let allProducts = [];

  // Define valid types from sidebar
  const validTypes = [
    "Men Suit", "Men Panjabi", "Men Kabli Panjabi", "Men Pajama",
    "Men Waistcoat", "Men T-Shirt", "Men Polo Shirt", "Men Chinos",
    "Men Jeans", "Men Shorts", "Men Shoes"
  ];

  // Load products
  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderMenProducts(); // Default load: all women products
    })
    .catch(err => {
      console.error("Failed to load products.json:", err);
      container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
    });

  // ✅ Render all "women" products
  function renderMenProducts() {
    container.innerHTML = '';
    const womenProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'men');

    womenProducts.forEach(product => {
      const item = document.createElement('div');
      item.className = 'item';
      const mainImage = product.image?.[0] || 'placeholder.jpg';
      item.innerHTML = `
        <img src="${mainImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="cardLayout">
          <i class="ri-shopping-cart-fill AddCart"></i>
          <div class="price">Price: $${product.price}</div>
          <i class="ri-heart-line" style = "font-size: 18px; margin-left: 5px;"></i>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // ✅ Render by sidebar type, including "Others"
  function renderProductsByType(type) {
    container.innerHTML = '';

    const womenProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'men');

    const filtered = womenProducts.filter(product => {
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
        <div class="cardLayout">
            <i class="ri-shopping-bag-2-line AddCart"></i>
            <div class="price">Price: $${product.price}</div>
            <i class="ri-heart-line" style = "font-size: 18px; margin-left: 5px;"></i>
        </div>
        
      `;
      container.appendChild(item);
    });
  }

  // ✅ Handle sidebar clicks
  sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const type = link.getAttribute('data-category');

      if (link.id === 'allProduct') {
        renderMenProducts(); // Show all women products
      } else {
        renderProductsByType(type);
      }
    });
  });
});

