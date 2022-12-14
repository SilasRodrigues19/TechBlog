import { db } from '../services/firebase';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // Cleanup - Deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const isCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const createUser = async ({ email, password, displayName }) => {
    isCancelled();
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: displayName,
      });

      return user;
    } catch ({ message }) {
      console.error(message);
      console.log(typeof message);

      let systemErrorMessage;

      if (message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter no mínimo 6 caracteres.';
      } else if (message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }
      setError(systemErrorMessage);
    }

    setIsLoading(false);
  };

  const logout = () => {
    isCancelled();

    signOut(auth);
  };

  const login = async({email, password}) => {
    isCancelled();
    setIsLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.';
      } else if(error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha incorreta.';
      } else {
        systemErrorMessage = 'Erro inesperado, por favor tente mais tarde.';
      }

      setError(systemErrorMessage);
      setIsLoading(false);
    }


  }

  useEffect(() => {
    return () => isCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    isLoading,
    logout,
    login,
  };
};
