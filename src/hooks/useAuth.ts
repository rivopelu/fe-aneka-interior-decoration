import { AuthContext } from '../context/AuthContext.ts';
import { useContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};
