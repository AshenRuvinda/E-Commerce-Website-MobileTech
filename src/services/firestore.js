import { db } from '../firebase/config';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, product);
    return { id, ...product };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(error.message);
  }
};