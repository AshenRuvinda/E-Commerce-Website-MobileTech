import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: userData.name || firebaseUser.displayName || '',
            // add any other user data you want to expose
          });
        } else {
          // If no Firestore profile, create one with displayName from auth or empty
          const initialName = firebaseUser.displayName || '';
          await setDoc(userDocRef, { name: initialName, email: firebaseUser.email, createdAt: new Date() });

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: initialName,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Signup function
  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update Firebase Auth profile with username
    if (username) {
      await updateProfile(userCredential.user, { displayName: username });
    }

    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: username || '',
      email: email,
      createdAt: new Date(),
    });

    // user state will update automatically via onAuthStateChanged listener
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Update user profile (username)
  const updateUserProfile = async (username) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    if (!username) throw new Error('Username is required');

    // Update Firebase Auth profile
    await updateProfile(auth.currentUser, { displayName: username });

    // Update Firestore user doc
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userDocRef, { name: username }, { merge: true });

    // Update local state
    setUser((prevUser) => ({
      ...prevUser,
      displayName: username,
    }));
  };

  if (loading) {
    return <div>Loading user...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
