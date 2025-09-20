fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.innerHTML = data;
    const wrapper = document.getElementById("categoriesWrapper");

    let isDown = false;
    let startX;
    let scrollLeft;

    // للماوس
    wrapper.addEventListener("mousedown", (e) => {
      isDown = true;
      wrapper.classList.add("dragging");
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener("mouseleave", () => {
      isDown = false;
      wrapper.classList.remove("dragging");
    });

    wrapper.addEventListener("mouseup", () => {
      isDown = false;
      wrapper.classList.remove("dragging");
    });

    wrapper.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.5; // سرعة السحب
      wrapper.scrollLeft = scrollLeft - walk;
    });

    // للتاتش (موبايل)
    let touchStartX = 0;
    wrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener("touchmove", (e) => {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      wrapper.scrollLeft = scrollLeft + diff;
    });





    const openAside = document.getElementById('btn');
    const closeAside = document.getElementById('close');

    openAside.addEventListener('click', (e) => {
      document.getElementById('aSide').classList.add('open');
    })

    closeAside.addEventListener('click', (e) => {
      document.getElementById('aSide').classList.remove('open');
    })

    let login = document.getElementById('login');
    let username = document.getElementById('username');
    let usernameSmall = document.getElementById('usernameSmall');
    let loginSmall = document.getElementById('loginSmall');

    if (localStorage.getItem('token')) {
      login.textContent = 'Logout';
      loginSmall.textContent = 'Logout';
      username.textContent = localStorage.getItem('user');
      usernameSmall.classList.remove('d-none');
      usernameSmall.textContent = localStorage.getItem('user');

    }

    login.addEventListener('click', e => {
      if (login.textContent == 'Logout') {
        login.href = '';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    })

    loginSmall.addEventListener('click', e => {
      if (loginSmall.textContent == 'Logout') {
        login.href = '';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    })


    async function getCart() {
      let response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'GET',
        headers: {
          "Content-Type": "Application/json",
          token: localStorage.getItem("token"),
        },
      })

      const result = await response.json();
      // console.log(result);
      document.getElementById('cartNumber').innerHTML = result.numOfCartItems;
      document.getElementById('cartNumberF').innerHTML = result.numOfCartItems;
      document.getElementById('cartPrice').innerHTML = result.data.totalCartPrice + ' EGP';
      document.getElementById('cartPriceF').innerHTML = result.data.totalCartPrice + ' EGP';
    }
    getCart();

    async function getWishlist() {
      let response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          token: localStorage.getItem("token"),
        }
      });

      const result = await response.json();
      // console.log('wishlist', result);

      let wishlistNumber = result.count;
      document.getElementById('wishlistNumber').innerHTML = wishlistNumber;
      document.getElementById('wishlistNumberF').innerHTML = wishlistNumber;
    }
    getWishlist();
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
    const addBtn = document.getElementById('add');
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