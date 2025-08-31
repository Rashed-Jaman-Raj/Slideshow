fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const productsList = document.getElementById('productsList');

    //products.forEach(product => {
      products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'item';

        // Use only the first image
        const mainImage = product.image[0];

        item.innerHTML = `
          <img src="${mainImage}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div class="price">Price:  $${product.price}</div>
          <button class="AddCart">Add to Cart <i class="ri-shopping-cart-2-fill"></i></button>
          <i class="ri-heart-line" style = "font-size: 18px; margin-left: 5px;"></i>
        ` ;

        productsList.appendChild(item);
      });
    // });
  })
  // .catch(error => console.error('Error loading products:', error));