document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsList');
  const sidebarLinks = document.querySelectorAll('.sideBar a');
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination';
  paginationContainer.style.textAlign = 'center';
  paginationContainer.style.marginTop = '20px';
  container.after(paginationContainer);

  let allProducts = [];
  let currentPage = 1;
  const productsPerPage = 8;
  let currentType = null;

  const validTypes = [
    "Top", "Kaftan", "Gown", "Shari",
    "Water Bottle", "Hand Bag", "Finger Ring", "Jump Suit",
    "Women Bangals", "Long Tunic", "Ear Ring", "Tunic With Shrug",
    "Women Shoes", "Top Buttom Set", "Socks", "Koti"
  ];

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      allProducts = data;
      renderProducts(); // Default load
    })
    .catch(err => {
      console.error("Failed to load products.json:", err);
      container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
    });

  function getFilteredProducts() {
    const womenProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'women');

    if (!currentType || currentType === 'all') {
      return womenProducts;
    }

    return womenProducts.filter(product => {
      const productType = product.type?.trim();
      if (currentType === 'Others') {
        return !validTypes.includes(productType);
      } else {
        return productType === currentType;
      }
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
          <i class="ri-shopping-cart-fill AddCart"></i>
          <div class="price">Price: $${product.price}</div>
          <i class="ri-heart-line" style = "font-size: 18px; margin-left: 5px;"></i>
        </div>
      `;
      container.appendChild(item);
    });

    renderPagination(filtered.length);
  }

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










