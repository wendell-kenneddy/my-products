import 'regenerator-runtime/runtime';
import { enablePersistence } from './db/db.js';
import { initModals } from './ui/ModalHandler.js';
import { initMenu } from './ui/Menu.js';
import { stopPropagation } from './utils/stopPropagation.js';
import {
  handleAuthChange,
  handleLogin,
  handleProductCreation,
  handleSignUp
} from './db/auth.js';

window.addEventListener('load', async () => {
  const modals = Array.from(document.querySelectorAll('.modal'));
  const navUl = document.querySelector('#page-header nav ul');

  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.log(error);
    }
  }

  enablePersistence();
  handleAuthChange();
  stopPropagation();
  initMenu();
  initModals(modals, navUl);
  handleSignUp();
  handleLogin();
  handleProductCreation();
});
