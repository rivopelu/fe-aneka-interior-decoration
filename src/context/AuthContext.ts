import { createContext } from 'react';
import { IAuthProviderProps } from '../components/AuthProvider.tsx';

export const AuthContext = createContext<IAuthProviderProps>({
  loginAction: () => {},
  token: undefined,
  logOut: () => {},
  user: undefined,
});
