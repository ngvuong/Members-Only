(function () {
  const userIcon = document.querySelector('.user-icon');
  const navMenu = document.querySelector('.nav__list--sub');

  userIcon.addEventListener(
    'click',
    () => {
      navMenu.classList.toggle('active');
      document.addEventListener('click', (e) => {
        if (e.target !== userIcon) {
          navMenu.classList.remove('active');
        }
      });
    },
    { bubbles: false }
  );
})();
