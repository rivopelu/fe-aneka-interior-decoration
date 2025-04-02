import { IReqSignIn } from '../../types/request/IReqSignIn.ts';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';

export function useSignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const initValue: IReqSignIn = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initValue,
    onSubmit: (e) => {
      auth.loginAction(e, setLoading);
    },
  });

  return { formik, showPassword, setShowPassword, loading };
}
