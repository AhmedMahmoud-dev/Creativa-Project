let products = new XMLHttpRequest();

products.open('get', 'https://ecommerce.routemisr.com/api/v1/products')

products.responseType = 'json';

products.send();

products.addEventListener('load', () => {
  // console.log(products.response);

  var data = products.response.data;

  var cartona = '';
  for (let i = 0; i < data.length; i++) {
    cartona += `
      <div class="cards col-lg-3 col-12 col-md-4 col-sm-6">
        <div class="card">
          <div class="control">
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-code-compare"></i>
          </div>
          <div class="discount">-21</div>
          <div class="image">
            <img src="${data[i].imageCover}" alt="${data[i].title}">
          </div>
          <div class="info">
            <div class="title">
              <a href="#">${data[i].title}</a>
            </div>
            <p>${data[i].description}</p>
            <div class="rating">
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="text">(${data[i].ratingsQuantity})</div>
            </div>
            <div class="price">
              <div class="new-price">
                <span>${data[i].price} EGP</span>
              </div>
            </div>
            <button class="add" data-id="${data[i]._id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `
  }

  document.getElementById('recommendedProducts').innerHTML = cartona;


  document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', e => {
      const ID = e.target.getAttribute('data-id');
      addProduct(ID);
    })
  })


})




async function addProduct(ID = '6428eb43dc1175abc65ca0b3') {
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
  console.log(result);
}