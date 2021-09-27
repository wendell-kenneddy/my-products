import { db } from './firebase-init';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  enableIndexedDbPersistence
} from 'firebase/firestore';
import { buildProductsHtml, setupProducts } from '../ui/ProductsContainer';

export const retrieveDocs = async () => {
  try {
    const docs = [];
    const col = collection(db, 'products');
    const q = query(col, where('name', '!=', false));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => docs.push(doc.data()));

    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const watchDelete = async products => {
  if (!products) return;

  for (const product of products) {
    const deleteBtn = product.querySelector('a.delete-product');

    deleteBtn.addEventListener('click', async e => {
      e.preventDefault();

      let target = e.target;
      let id;

      if (target.tagName.toLowerCase() == 'img') {
        target = target.parentElement;
      }

      id = target.dataset.id;

      await deleteProduct(id);
    });
  }
};

export const listenToSnapshots = async uid => {
  const col = collection(db, 'products');
  const q = query(col, where('owner_id', '==', uid));
  return onSnapshot(
    q,
    querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push([doc.id, doc.data()]);
      });
      const docsHtml = buildProductsHtml(docs);

      setupProducts(docsHtml, false);

      if (docsHtml) {
        const products = Array.from(
          document.querySelectorAll('ul.product-list li')
        );

        watchDelete(products);
      }
    },
    error => console.log(error)
  );
};

export const addProduct = async product => {
  if (!product) return;

  const col = collection(db, 'products');
  await addDoc(col, product);
};

export const deleteProduct = async id => {
  if (!id) return;

  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
};

export const addUser = async (uid, data) => {
  if (!uid || !data) return;

  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data);
};

export const retrieveUser = async uid => {
  if (!uid) return;

  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  return userDoc.data();
};

export const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db, {});
  } catch (error) {
    if (error.code == 'failed-precondition') {
      console.warn('Falha ao persistir dados.');
    }

    if (error.code == 'unimplemented') {
      console.warn('Seu navegador nao suporta persistência de dados.');
    }
  }
};
