// loadFooter.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer-placeholder").innerHTML = html;
    })
    // .then(() => {
    //   const script = document.createElement("script");
    //   script.src = "headerFooter.js";
    //   document.body.appendChild(script);
    // });
});
