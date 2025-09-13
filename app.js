// document.querySelectorAll('.nav-link').forEach(button => {
//   button.addEventListener('click', (e) => {
//     e.preventDefault(); // Prevent default if button is within a form
//     const dropdown = button.closest('.nav-link');
//     dropdown.classList.toggle('open');

    //close other dropdown
    // document.querySelectorAll('.nav-link').forEach(el => {
    //   if (el !== dropdown) el.classList.remove('open');
    // });
//   });
// });


// Optional: Close dropdowns when clicking outside

// document.addEventListener('click', (e) => {
//   if (!e.target.closest('.nav-link')) {
//     document.querySelectorAll('.nav-link').forEach(drop => drop.classList.remove('open'));
//   };
// });


// Mobile menu start ========
function openNav() {
  document.getElementById("nav-container").style.left = "0";
}

function closeNav() {
  document.getElementById("nav-container").style.left = "-250px";
}
// mobile menu end ========




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