import { AuthContext } from './AuthContext';
import { ReactNode, useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem('jwt'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        setJwt(token);
        localStorage.setItem('jwt', token);
      } else {
        setJwt(null);
        localStorage.removeItem('jwt');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
}