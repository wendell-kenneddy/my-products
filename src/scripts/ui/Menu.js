const navUl = document.querySelector('#page-header nav ul');
const openMenuBtn = document.querySelector('#page-header nav div.menu');
const closeBtn = document.getElementById('close-menu');

export const closeMenu = e => {
  if (e) e.preventDefault();

  navUl.style.display = 'none';
  closeBtn.removeEventListener('click', closeMenu);
};

export const showMenu = () => {
  navUl.style.display = 'flex';

  closeBtn.addEventListener('click', closeMenu);
};

export const initMenu = () => {
  openMenuBtn.addEventListener('click', showMenu);
};

export const handleLinks = user => {
  const loggedInLinks = Array.from(
    document.querySelectorAll('#page-header nav ul a.logged-in')
  );

  const loggedOutLinks = Array.from(
    document.querySelectorAll('#page-header nav ul a.logged-out')
  );

  if (user) {
    for (const link of loggedInLinks) {
      link.style.display = 'block';
    }

    for (const link of loggedOutLinks) {
      link.style.display = 'none';
    }

    return;
  }

  for (const link of loggedInLinks) {
    link.style.display = 'none';
  }

  for (const link of loggedOutLinks) {
    link.style.display = 'block';
  }
};
