let products = new XMLHttpRequest();

products.open('get', 'https://ecommerce.routemisr.com/api/v1/products')

products.responseType = 'json';

products.send();

products.addEventListener('load', () => {
  // console.log(products.response);

  var data = products.response.data;

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  var recommended = data.slice(0, 4);

  var cartona = '';
  let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
  for (let i = 0; i < recommended.length; i++) {
    const isInWishList = wishlist.includes(recommended[i]._id);
    cartona += `
      <div class="cards col-lg-3 col-12 col-md-4 col-sm-6">
        <div class="card">
          <div class="control">
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-heart addWishlist ${isInWishList ? 'text-danger' : ''}" data-id="${data[i]._id}"></i>
            <i class="fa-solid fa-code-compare"></i>
          </div>
          <div class="discount">-21</div>
          <div class="image">
            <img src="${recommended[i].imageCover}" alt="${recommended[i].title}">
          </div>
          <div class="info">
            <div class="title">
              <a href="#">${recommended[i].title}</a>
            </div>
            <p>${recommended[i].description}</p>
            <div class="rating">
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="text">(${recommended[i].ratingsQuantity})</div>
            </div>
            <div class="price">
              <div class="new-price">
                <span>${recommended[i].price} EGP</span>
              </div>
            </div>
            <button class="addCart" data-id="${recommended[i]._id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `
  }

  document.getElementById('recommendedProducts').innerHTML = cartona;


  document.querySelectorAll('.addCart').forEach(btn => {
    btn.addEventListener('click', e => {
      const ID = e.target.getAttribute('data-id');
      addProductToCart(ID);
    })
  })


  document.querySelectorAll('.addWishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      const ID = e.target.getAttribute('data-id');
      addProductToWishlist(ID);
      e.target.classList.add('text-danger')
    })
  })




})




async function addProductToCart(ID) {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      token: localStorage.getItem("token"),
    },
    body:
      JSON.stringify({
        productId: ID
      })
  });

  const result = await response.json();
  // console.log(result);
}

async function addProductToWishlist(ID) {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      token: localStorage.getItem("token"),
    },
    body:
      JSON.stringify({
        productId: ID
      })
  });

  const result = await response.json();
  // console.log('wishlist', result);

  if (response.ok) {
    let wishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    if (!wishlist.includes(ID)) {
      wishlist.push(ID);
    }

    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
  }
}