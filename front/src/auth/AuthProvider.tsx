import { AuthContext } from './AuthContext';
import { ReactNode, useState } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem('jwt'));

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
}