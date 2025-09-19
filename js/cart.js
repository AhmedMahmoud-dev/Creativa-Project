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
  // console.log(result);
  document.getElementById('cartNumber').innerHTML = result.numOfCartItems;
  document.getElementById('cartPrice').innerHTML = result.data.totalCartPrice + ' EGP';

  let cartona = '';

  let data = result.data.products;

  // console.log(data)

  data.forEach(item => {
    cartona += `
      <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img src='${item.product.imageCover}'
                class="img-fluid rounded-3" alt="${item.product.title}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">${item.product.title.split(' ').slice(0, 3).join(' ')}</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2" onclick="update('-', '${item.product._id}')">
                <i class="fas fa-minus"></i>
              </button>

              <input readonly data-id="${item.product._id}" id="form1" min="0" name="quantity" value="${item.count}" type="number" class="form-control form-control-sm">

              <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2" onclick="update('+', '${item.product._id}')">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">${item.price} EGP</h5>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <a onclick="removeCartItem('${item.product._id}')" class="text-danger" style='cursor: pointer'><i class="fas fa-trash fa-lg"></i></a>
            </div>
          </div>
        </div>
      </div>
    `
  });
  document.getElementById('cartLeft').innerHTML = cartona;
  // console.log(cartona);
  document.getElementById('price').innerHTML = 'Total Price ' + result.data.totalCartPrice + ' EGP';
}

getCart();


async function removeCartItem(ID) {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${ID}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    }
  })
  console.log('test')
  getCart();
}



async function update(method, ID) {
  let input = document.querySelector(`input[data-id='${ID}']`);
  let currentCount = parseInt(input.value);

  if (method === '+') {
    currentCount++;
  } else if (method === '-') {
    currentCount = Math.max(1, currentCount - 1);
  }

  // Update on server
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${ID}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      count: currentCount
    })
  });

  getCart();
}


async function getWishlist() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      token: localStorage.getItem("token"),
    }
  });

  const result = await response.json();
  console.log('wishlist', result);

  let data = result.data;
  let wishlistNumber = result.count;
  document.getElementById('wishlistNumber').innerHTML = wishlistNumber;
}

getWishlist();