  // fetch('products.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     const container = document.getElementById('productsList');

  //     // Filter products with category "Men" (case-insensitive)
  //     const menProducts = data.filter(product => {
  //       return product.category?.toLowerCase().trim() === "men";
  //     });

  //     // Inject each product into the DOM
  //     menProducts.forEach(product => {
  //       const item = document.createElement('div');
  //       item.className = 'item';
  //       const mainImage = product.image[0];
  //       item.innerHTML = `
  //         <img src="${mainImage}" alt="${product.name}">
  //         <h3>${product.name}</h3>
  //         <div class="price">Price:  $${product.price}</div>
  //         <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
  //         <i class="ri-heart-line" style = "font-size: 18px; margin-left: 5px;"></i>
  //       `;
  //       container.appendChild(item);
  //     });
  //   })
  //   .catch(error => {
  //     console.error("Error loading Men category products:", error);
  //   });



// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('productsList');
//   const sidebarLinks = document.querySelectorAll('.sideBar a');
//   let allProducts = [];

//   // Load products once
//   fetch('products.json')
//     .then(res => res.json())
//     .then(data => {
//       allProducts = data;
//       renderProducts('Polo Shirt'); // Default load
//     })
//     .catch(err => console.error("Failed to load products.json:", err));

//   // Render products by type (not category)
//   function renderProducts(type) {
//     container.innerHTML = ''; // Clear previous items

//     const filtered = allProducts.filter(product => {
//       return product.type?.toLowerCase().trim() === type.toLowerCase().trim();
//     });

//     if (filtered.length === 0) {
//       container.innerHTML = `<p>No products found for "${type}"</p>`;
//       return;
//     }

//     filtered.forEach(product => {
//       const item = document.createElement('div');
//       item.className = 'item';
//       const mainImage = product.image?.[0] || 'placeholder.jpg';
//       item.innerHTML = `
//         <img src="${mainImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">Price: $${product.price}</div>
//         <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
//         <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
//       `;
//       container.appendChild(item);
//     });
//   }

//   // Handle sidebar clicks
//   sidebarLinks.forEach(link => {
//     link.addEventListener('click', e => {
//       e.preventDefault();
//       const type = link.getAttribute('data-category');
//       renderProducts(type);
//     });
//   });
// });




// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.getElementById('productsList');
//   const sidebarLinks = document.querySelectorAll('.sideBar a');
//   let allProducts = [];

//   // Load products once
//   fetch('products.json')
//     .then(res => res.json())
//     .then(data => {
//       allProducts = data;
//       renderMenCategory(); // ✅ Default load: all "men" category products
//     })
//     .catch(err => {
//       console.error("Failed to load products.json:", err);
//       container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
//     });

//   // ✅ Render all products where category === "men"
//   function renderMenCategory() {
//     container.innerHTML = '';

//     const menProducts = allProducts.filter(product => {
//       return product.category?.toLowerCase().trim() === 'men';
//     });

//     if (menProducts.length === 0) {
//       container.innerHTML = `<p>No products found in the "Men" category.</p>`;
//       return;
//     }

//     menProducts.forEach(product => {
//       const item = document.createElement('div');
//       item.className = 'item';
//       const mainImage = product.image?.[0] || 'placeholder.jpg';
//       item.innerHTML = `
//         <img src="${mainImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">Price: $${product.price}</div>
//         <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
//         <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
//       `;
//       container.appendChild(item);
//     });
//   }

//   // ✅ Render products by type (used for sidebar clicks)
//   function renderProducts(type) {
//     container.innerHTML = '';

//     const filtered = allProducts.filter(product => {
//       return product.type?.toLowerCase().trim() === type.toLowerCase().trim();
//     });

//     if (filtered.length === 0) {
//       container.innerHTML = `<p>No products found for "${type}"</p>`;
//       return;
//     }

//     filtered.forEach(product => {
//       const item = document.createElement('div');
//       item.className = 'item';
//       const mainImage = product.image?.[0] || 'placeholder.jpg';
//       item.innerHTML = `
//         <img src="${mainImage}" alt="${product.name}">
//         <h3>${product.name}</h3>
//         <div class="price">Price: $${product.price}</div>
//         <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
//         <i class="ri-heart-line" style="font-size: 18px; margin-left: 5px;"></i>
//       `;
//       container.appendChild(item);
//     });
//   }

//   // ✅ Handle sidebar clicks
//   sidebarLinks.forEach(link => {
//     link.addEventListener('click', e => {
//       e.preventDefault();
//       const type = link.getAttribute('data-category');
//       renderProducts(type);
//     });
//   });
// });



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
      renderMenProducts(); // Default load: all men products
    })
    .catch(err => {
      console.error("Failed to load products.json:", err);
      container.innerHTML = `<p style="color:red;">Error loading products.</p>`;
    });

  // ✅ Render all "men" products
  function renderMenProducts() {
    container.innerHTML = '';
    const menProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'men');

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

    const menProducts = allProducts.filter(p => p.category?.toLowerCase().trim() === 'men');

    const filtered = menProducts.filter(product => {
      const productType = product.type?.trim();
      if (type === 'Others') {
        return !validTypes.includes(productType);
      } else {
        return productType === type;
      }
    });

    // if (filtered.length === 0) {
    //   container.innerHTML = `<h3>No products found for "${type}"</h3>`;
    //   return;
    // }

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

