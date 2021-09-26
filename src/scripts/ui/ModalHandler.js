import { handleSignOut } from '../db/auth.js';
import { removeAlerts } from './Alerts.js';
import { closeMenu } from './Menu.js';

let modal = null;

export const closeModal = _modal => {
  if (_modal instanceof HTMLElement) modal = _modal;
  const modalForm = modal.querySelector('form');
  if (modalForm) modalForm.reset();

  removeAlerts();
  modal.classList.add('hide');
  modal.classList.remove('active');
  modal.removeEventListener('click', closeModal);
};

export const closeModalOnClickOutside = () => {
  if (!modal) return;

  modal.addEventListener('click', closeModal);
};

export const handleModal = () => {
  if (!modal) return;

  if (modal.classList.contains('hide')) {
    closeMenu();
    modal.classList.remove('hide');
    modal.classList.add('active');
    closeModalOnClickOutside(modal);
    return;
  }
};

export const initModals = (modals, navUl) => {
  if (!modals || !navUl) return;

  navUl.addEventListener('click', e => {
    const target = e.target;
    const tag = target.tagName.toLowerCase();

    if (tag === 'a') {
      e.preventDefault();

      const triggers = target.dataset.triggers;

      if (triggers === 'logout') {
        handleSignOut();
        return;
      }

      modal = modals.find(m => m.dataset.target === triggers);

      handleModal();
    }

    return;
  });
};
