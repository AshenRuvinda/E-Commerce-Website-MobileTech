import { createContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...userDocSnap.data() });
        } else {
          // No user doc, create default
          await setDoc(userDocRef, {
            name: firebaseUser.displayName || '',
            email: firebaseUser.email,
            createdAt: new Date()
          });
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, name: firebaseUser.displayName || '' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (username) {
      await updateProfile(userCredential.user, { displayName: username });
    }
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: username || '',
      email: email,
      createdAt: new Date()
    });
  };

  const logout = () => signOut(auth);

  const updateUserProfile = async (username) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    if (!username) throw new Error('Username is required');

    await updateProfile(auth.currentUser, { displayName: username });
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userDocRef, { name: username }, { merge: true });

    setUser(prevUser => ({ ...prevUser, name: username }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
