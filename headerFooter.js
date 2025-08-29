document.querySelectorAll('.nav-link').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default if button is within a form
    const dropdown = button.closest('.nav-link');
    dropdown.classList.toggle('open');

    //close other dropdown
    document.querySelectorAll('.nav-link').forEach(el => {
      if (el !== dropdown) el.classList.remove('open');
    });
  });
});


// Optional: Close dropdowns when clicking outside

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-link')) {
    document.querySelectorAll('.nav-link').forEach(drop => drop.classList.remove('open'));
  };
});


// Mobile menu start ========
function openNav() {
  document.getElementById("nav-container").style.left = "0";
}

function closeNav() {
  document.getElementById("nav-container").style.left = "-250px";
}
// mobile menu end ========