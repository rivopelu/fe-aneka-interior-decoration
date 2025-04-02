import { IReqSignIn } from '../../types/request/IReqSignIn.ts';
import { useFormik } from 'formik';
import { useState } from 'react';

export function useSignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const initValue: IReqSignIn = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues: initValue,
    onSubmit: (e) => {
      alert(JSON.stringify(e));
    },
  });

  return { formik, showPassword, setShowPassword };
}
