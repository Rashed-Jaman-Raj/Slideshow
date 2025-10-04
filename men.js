//men.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsList');
  const sidebarLinks = document.querySelectorAll('.sideBar a');
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination';
  paginationContainer.style.textAlign = 'center';
  paginationContainer.style.marginTop = '20px';
  container.after(paginationContainer);

  const cartCountEl = document.querySelector('.cartCount');
  let allProducts = [];
  let currentPage = 1;
  const productsPerPage = 100;
  let currentType = null;

  const validTypes = [
    "Men Polo Shirt", "Men T-Shirt", "Men Panjabi", "Men Shoes",
    "Men Chinos", "Men Suit", "Men Kabli Panjabi", "Men Pajama",
    "Men Shorts", "Men Jeans", "Men Waistcoat", "Others"
  ];

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountEl) cartCountEl.textContent = totalItems;
  }

  function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    if (cart[productId]) {
      cart[productId].quantity += 1;
    } else {
      cart[productId] = {
        ...product,
        quantity: 1
      };
    }

    saveCart();
    updateCartCount();
  }

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts();
      updateCartCount(); // Initialize count on load
    })
    .catch(err => {
      console.error("Failed to load products.json:", err);
      container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
    });

  function getFilteredProducts() {
    const womenProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'men');
    if (!currentType || currentType === 'all') return womenProducts;

    return womenProducts.filter(product => {
      const productType = product.type?.trim();
      return currentType === 'Others'
        ? !validTypes.includes(productType)
        : productType === currentType;
    });
  }

  function paginate(products, page) {
    const start = (page - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }

  function renderPagination(totalItems) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / productsPerPage);

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.style.margin = '0 10px';
    prevBtn.onclick = () => {
      currentPage--;
      renderProducts();
    };
    paginationContainer.appendChild(prevBtn);

    const pageInfo = document.createElement('span');
    pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
    paginationContainer.appendChild(pageInfo);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.style.margin = '0 10px';
    nextBtn.onclick = () => {
      currentPage++;
      renderProducts();
    };
    paginationContainer.appendChild(nextBtn);
  }

  function renderProducts() {
    container.innerHTML = '';
    const filtered = getFilteredProducts();
    const paginated = paginate(filtered, currentPage);

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
          No products found${currentType && currentType !== 'all' ? ` for "${currentType}"` : ''}
        </h3>
      `;
      paginationContainer.innerHTML = '';
      return;
    }

    paginated.forEach(product => {
      const item = document.createElement('div');
      item.className = 'item';
      const mainImage = product.image?.[0] || 'placeholder.jpg';
      item.innerHTML = `
        <img src="${mainImage}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="cardLayout">
        <button class="ri-shopping-cart-line AddCart" data-id="${product.id}"></button>
        <div class="price">Price: $${product.price}</div>
        <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
      </div>
      `;
      container.appendChild(item);
    });

    renderPagination(filtered.length);
  }

  container.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('AddCart')) {
      const productId = target.getAttribute('data-id');
      addToCart(productId);
    }
  });

  sidebarLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      currentPage = 1;
      const type = link.getAttribute('data-category');
      currentType = link.id === 'allProduct' ? 'all' : type;
      renderProducts();
    });
  });
});


