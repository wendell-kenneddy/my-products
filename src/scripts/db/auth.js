import { closeModal } from '../ui/ModalHandler';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-init';
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { setupProducts } from '../ui/ProductsContainer';
import { addProduct, addUser, listenToSnapshots, retrieveUser } from './db';
import { handleLinks } from '../ui/Menu';
import { setupAccountDetails } from '../ui/AccountInfo';
import { showAlert, removeAlerts } from '../ui/Alerts';
let uid;

export const handleAuthChange = async () => {
  try {
    let unsubscribe = () => null;

    onAuthStateChanged(auth, async user => {
      if (user) {
        unsubscribe = await listenToSnapshots(user.uid);
        uid = user.uid;
        const userDoc = await retrieveUser(user.uid);
        handleLinks(user);
        setupAccountDetails(userDoc.bio, user.email);
      } else {
        uid = null;
        handleLinks(user);
        setupAccountDetails();
        setupProducts(null, true);
        return unsubscribe();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Signup
export const handleSignUp = async () => {
  try {
    const signupForm = document.getElementById('signup-form');
    const signupEmail = signupForm['signup-email'];
    const signupPassword = signupForm['signup-password'];
    const signupBio = signupForm['bio'];

    signupForm.addEventListener('submit', async e => {
      try {
        e.preventDefault();

        removeAlerts();
        const email = signupEmail.value;
        const password = signupPassword.value;
        const bio = signupBio.value;
        const credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await addUser(credentials.user.uid, { bio });

        closeModal('modal#signup-modal');
        signupForm.reset();
      } catch (error) {
        let messageToUser;

        if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
          messageToUser = 'E-mail já em uso.';
        }

        showAlert(signupForm, messageToUser);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Login
export const handleLogin = async () => {
  const loginForm = document.getElementById('login-form');
  const loginEmail = loginForm['login-email'];
  const loginPassword = loginForm['login-password'];

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    removeAlerts();
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      closeModal(document.querySelector('modal#login-modal'));
      loginForm.reset();
    } catch (error) {
      let messageToUser;

      if (error.message == 'Firebase: Error (auth/wrong-password).') {
        messageToUser = 'Senha incorreta.';
      }

      if (error.message == 'Firebase: Error (auth/user-not-found).') {
        messageToUser = 'Usuário inexistente.';
      }

      showAlert(loginForm, messageToUser);
    }
  });
};

// Product Creation
export const handleProductCreation = async () => {
  try {
    const productForm = document.getElementById('create-product-form');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');

    productForm.addEventListener('submit', async e => {
      e.preventDefault();

      const product = {
        name: productName.value,
        description: productDescription.value,
        owner_id: uid
      };

      closeModal('modal#create-product-modal');
      productForm.reset();
      await addProduct(product);
    });
  } catch (error) {
    console.log(error);
  }
};

// Logout
export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
