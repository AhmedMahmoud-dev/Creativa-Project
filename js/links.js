fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.innerHTML = data;
    // const wrapper = document.getElementById("categoriesWrapper");
    // const btnLeft = document.getElementById("scrollLeft");
    // const btnRight = document.getElementById("scrollRight");

    // function updateButtons() {
    //   btnLeft.classList.toggle("disabled", wrapper.scrollLeft <= 0);
    //   btnRight.classList.toggle(
    //     "disabled",
    //     wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth
    //   );
    // }

    // function scrollCategories(amount) {
    //   wrapper.scrollBy({ left: amount, behavior: "smooth" });
    //   setTimeout(updateButtons, 400);
    // }

    // btnLeft.addEventListener("click", () => {
    //   if (!btnLeft.classList.contains("disabled")) scrollCategories(-300);
    // });

    // btnRight.addEventListener("click", () => {
    //   if (!btnRight.classList.contains("disabled")) scrollCategories(300);
    // });

    // updateButtons();

    // if (localStorage.getItem('token')) {
    //   document.getElementById('username').innerHTML = localStorage.getItem('user');
    //   document.getElementById('logged').classList.add('d-none');
    // }

    const openAside = document.getElementById('btn');
    const closeAside = document.getElementById('close');

    openAside.addEventListener('click', (e) => {
      document.getElementById('aSide').classList.add('open');
    })

    closeAside.addEventListener('click', (e) => {
      document.getElementById('aSide').classList.remove('open');
    })
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


fetch('popular.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('popular').innerHTML = data;
    const rec = document.getElementById('popular');
    if (rec) rec.innerHTML = data;
  })



fetch('sale1.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('sale1').innerHTML = data;
    const rec = document.getElementById('sale1');
    if (rec) rec.innerHTML = data;
  })



fetch('sale2.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('sale2').innerHTML = data;
    const rec = document.getElementById('sale2');
    if (rec) rec.innerHTML = data;


    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 100);
    targetDate.setHours(targetDate.getHours() + 10); // +10 hours
    targetDate.setMinutes(targetDate.getMinutes() + 3); // +3 minutes
    targetDate.setSeconds(targetDate.getSeconds() + 20); // +20 seconds

    const day = document.getElementById('day');
    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const second = document.getElementById('second');



    function updateCountDown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        // document.getElementById('countdown').innerHTML = 'Offer Ended!';
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      day.innerHTML = days;
      hour.innerHTML = hours;
      minute.innerHTML = minutes;
      second.innerHTML = seconds;
    }

    updateCountDown();
    const timer = setInterval(updateCountDown, 1000);
  })



fetch('feature-products.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('feature-products').innerHTML = data;
    const rec = document.getElementById('feature-products');
    if (rec) rec.innerHTML = data;
  })



fetch('latest-blog.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('latest-blog').innerHTML = data;
    const rec = document.getElementById('latest-blog');
    if (rec) rec.innerHTML = data;
  })