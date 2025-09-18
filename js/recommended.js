let products = new XMLHttpRequest;

products.open('get', 'https://ecommerce.routemisr.com/api/v1/products')

products.responseType = 'json';

products.send();

products.addEventListener('load', () => {
  console.log(products.response);

  var data = products.response.data;

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  var recommended = data.slice(0, 4);

  var cartona = '';
  for (let i = 0; i < recommended.length; i++) {
    cartona += `
      <div class="cards col-lg-3 col-12 col-md-4 col-sm-6">
        <div class="card">
          <div class="control">
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-code-compare"></i>
          </div>
          <div class="discount">-21</div>
          <div class="image" data-id='${recommended[i]._id}'>
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
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    `
  }

  document.getElementById('recommendedProducts').innerHTML = cartona;
  document.querySelectorAll('.image').forEach((img => {
    img.addEventListener('click', () => {
      const id = img.dataset.id;
      window.location.href = `details.html?id=${id}`;
    })
  }))
})