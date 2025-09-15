document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  let error = document.getElementById('error');

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('result', result);

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      error.classList.remove('d-none');
      error.innerHTML = result.message || 'something went wrong';
    }
  } catch (err) {
    error.classList.remove('d-none');
    error.innerHTML = err.errors.msg;
  }
});
