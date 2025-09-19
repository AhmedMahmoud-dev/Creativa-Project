document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  let error = document.getElementById('error');
  let loading = document.getElementById('loading');

  try {
    loading.classList.remove('d-none');
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log('result', result);

    if (result.statusMsg == 'fail') {
      error.innerHTML = result.message;
    }

    if (response.ok) {
      window.location.href = 'login.html';
      console.log('if', result);
    } else {
      error.classList.remove('d-none');
      error.innerHTML = `${result.errors.param} ${result.errors.msg}` || result.message;
      console.log('else', result);
    }
  } catch (err) {
    error.classList.remove('d-none');
    error.innerHTML = err.errors.msg;
    console.log('catch', result);
  } finally {
    loading.classList.add('d-none');
  }
});
