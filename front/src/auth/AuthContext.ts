import { createContext } from 'react';

export interface AuthContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
