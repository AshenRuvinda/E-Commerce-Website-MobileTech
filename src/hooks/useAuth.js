import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, logout } = context;

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUserProfile = async (displayName) => {
    try {
      await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { user, login, signup, logout, updateUserProfile };
};