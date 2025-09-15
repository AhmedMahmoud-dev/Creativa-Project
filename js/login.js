document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  let error = document.getElementById('error');
  error = null;

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('result', result);

    if (response.ok) {
      localStorage.setItem('user', result.user.name);
      localStorage.setItem('token', result.token);
      window.location.href = 'index.html';
    } else {
      error.classList.remove('d-none');
      error.innerHTML = result.errors.msg || result.message || 'something went wrong';
      console.log(error);
    }
  } catch (err) {
    error.classList.remove('d-none');
    error.innerHTML = err.errors.msg;
  }
})