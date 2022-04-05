(function () {
  const userIcon = document.querySelector('.user-icon');
  const navMenu = document.querySelector('.nav__list--sub');

  if (userIcon) {
    userIcon.addEventListener('click', (e) => {
      navMenu.classList.toggle('active');
      e.stopPropagation();
      document.removeEventListener('click', closeNavMenu);
      document.addEventListener('click', closeNavMenu, { once: true });
    });
  }

  function closeNavMenu(e) {
    if (e.target !== userIcon) {
      navMenu.classList.remove('active');
    }
  }
})();
