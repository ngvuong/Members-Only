(function () {
  const userIcon = document.querySelector('.user-icon');
  const navMenu = document.querySelector('.nav__list--sub');

  userIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
})();
