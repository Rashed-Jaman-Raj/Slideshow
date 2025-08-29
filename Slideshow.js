
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(r) {
  showSlides(slideIndex += r); 
}

function currentSlides(r) {
  showSlides(slideIndex = r);
}

function showSlides(r) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (r > slides.length) {slideIndex = 1}
  if (r < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000);
}

