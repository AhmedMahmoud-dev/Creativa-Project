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

  let data = result.data;
  let wishlistNumber = result.count;
  document.getElementById('wishlistNumber').innerHTML = wishlistNumber;

  // console.log(data)

  let cartona = '';

  data.forEach(item => {
    cartona += `
      <div class="content d-flex gap-3 align-items-center">
        <div class="image">
          <img src="${item.imageCover}" alt="${item.title}">
        </div>
        <div class="title flex-grow-1">
          <p>${item.title}</p>
        </div>
        <div class="control">
          <button class="btn btn-outline-danger btn-lg" onclick="remove('${item._id}')">Remove</button>
        </div>
      </div>
    `
  });

  document.getElementById('wishlist').innerHTML = cartona;
}

getWishlist();


fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    // document.getElementById('footer').innerHTML = data;
    const footer = document.getElementById('footer');
    if (footer) footer.innerHTML = data;
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
  // console.log('cart', result);
  document.getElementById('cartNumber').innerHTML = result.numOfCartItems;
  document.getElementById('cartPrice').innerHTML = result.data.totalCartPrice + ' EGP';
}


async function remove(ID) {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${ID}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "Application/json",
      token: localStorage.getItem("token"),
    },
  })

  const result = await response.json();
  // console.log('cart', result);
  // let wishlistNumber = result.count;
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  wishlistItems = wishlistItems.filter(itemId => itemId !== ID);
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  getWishlist();
  // document.getElementById('wishlistNumber').innerHTML = wishlistNumber;
  // document.getElementById('cartNumber').innerHTML = result.numOfCartItems;
  // document.getElementById('cartPrice').innerHTML = result.data.totalCartPrice + ' EGP';
}

getCart()