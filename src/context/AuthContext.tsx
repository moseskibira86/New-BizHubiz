import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await signInWithPopup(auth, googleProvider);
      setIsDemoMode(false);
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      // In sandbox/iframe popups might be blocked or require fallback
      if (err?.code === 'auth/popup-blocked' || err?.message?.includes('popup')) {
        setAuthError('Popup was blocked by your browser. Please allow popups or try email sign in.');
      } else {
        setAuthError(err?.message || 'Failed to sign in with Google');
      }
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await signInWithEmailAndPassword(auth, email, pass);
      setIsDemoMode(false);
    } catch (err: any) {
      console.error('Email Sign In failed:', err);
      let msg = 'Failed to sign in. Please verify your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      }
      setAuthError(msg);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await createUserWithEmailAndPassword(auth, email, pass);
      setIsDemoMode(false);
    } catch (err: any) {
      console.error('Sign Up failed:', err);
      let msg = 'Sign up failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'An account with this email already exists.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setAuthError(msg);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
      setUser(null);
      setIsDemoMode(false);
    } catch (err: any) {
      console.error('Sign out failed:', err);
    }
  };

  const resetPassword = async (email: string) => {
    setAuthError(null);
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error('Password reset failed:', err);
      setAuthError(err?.message || 'Failed to send password reset email.');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemoMode,
        setIsDemoMode,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
