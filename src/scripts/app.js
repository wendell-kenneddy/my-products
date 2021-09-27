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

  handleAuthChange();
  stopPropagation();
  initMenu();
  initModals(modals, navUl);
  handleSignUp();
  handleLogin();
  handleProductCreation();
});
