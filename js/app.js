fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('navbar').innerHTML = data;
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.innerHTML = data;
    const wrapper = document.getElementById("categoriesWrapper");
    const btnLeft = document.getElementById("scrollLeft");
    const btnRight = document.getElementById("scrollRight");

    function updateButtons() {
      btnLeft.classList.toggle("disabled", wrapper.scrollLeft <= 0);
      btnRight.classList.toggle(
        "disabled",
        wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth
      );
    }

    function scrollCategories(amount) {
      wrapper.scrollBy({ left: amount, behavior: "smooth" });
      setTimeout(updateButtons, 400);
    }

    btnLeft.addEventListener("click", () => {
      if (!btnLeft.classList.contains("disabled")) scrollCategories(-300);
    });

    btnRight.addEventListener("click", () => {
      if (!btnRight.classList.contains("disabled")) scrollCategories(300);
    });

    updateButtons();
  })


fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('footer').innerHTML = data;
    const footer = document.getElementById('footer');
    if (footer) footer.innerHTML = data;
  })


fetch('recommended.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('recommended').innerHTML = data;
    const rec = document.getElementById('recommended');
    if (rec) rec.innerHTML = data;
  })


fetch('testemonial.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('testemonial').innerHTML = data;
    const rec = document.getElementById('testemonial');
    if (rec) rec.innerHTML = data;
  })


fetch('testemonial2.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('testemonial2').innerHTML = data;
    const rec = document.getElementById('testemonial2');
    if (rec) rec.innerHTML = data;
  })