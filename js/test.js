const openAside = document.getElementById('btn');
const closeAside = document.getElementById('close');

openAside.addEventListener('click', (e) => {
  document.getElementById('aSide').classList.add('open');
})

closeAside.addEventListener('click', (e) => {
  document.getElementById('aSide').classList.remove('open');
})