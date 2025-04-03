import { Card, CardBody } from '../../components/Card.tsx';
import Grid from '../../components/Grid.tsx';
import InputText from '../../components/InputText.tsx';
import Button, { LinkButton } from '../../components/Button.tsx';
import { ROUTES } from '../../routes/routes.ts';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FormikProvider, useFormik } from 'formik';
import { IReqSignUp } from '../../types/request/IReqSignUp.ts';
import * as Yup from 'yup';
import { HttpService } from '../../services/http.service.ts';
import ErrorService from '../../services/error.service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function SignUpPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const initValue: IReqSignUp = {
    name: '',
    confirmation_password: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Nama wajib diisi').min(3, 'Nama minimal 3 karakter'),
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().required('Password wajib diisi').min(4, 'Password minimal 4 karakter'),
    confirmation_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Konfirmasi password harus sama')
      .required('Konfirmasi password wajib diisi'),
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoadingSubmit(true);
      httpService
        .POST(ENDPOINT.SIGN_UP(), values)
        .then(() => {
          toast.success('Pendaftaran kamu berhasil, silahkan masuk !');
          setLoadingSubmit(false);
          navigate(ROUTES.SIGN_IN());
        })
        .catch((error) => {
          errorService.fetchApiError(error);
          setLoadingSubmit(false);
        });
    },
  });

  return (
    <div className={'flex items-center justify-center min-h-screen'}>
      <FormikProvider value={formik}>
        <Card>
          <CardBody>
            <div className={'min-w-sm'}>
              <h1 className={'text-2xl'}>Daftar</h1>
              <div>Masukan informasi untuk mendaftar</div>
              <Grid className={'mt-4'} gap={'sm'}>
                <InputText id={'name'} name={'name'} placeholder={'Masukan nama'} label={'Nama'} required />
                <InputText id={'email'} name={'email'} placeholder={'Masukan email'} label={'email'} required />
                <InputText
                  id={'password'}
                  name={'password'}
                  placeholder={'Masukan Password'}
                  label={'password'}
                  required
                  type={showPassword ? 'text' : 'password'}
                  endIcon={
                    <div className={'cursor-pointer text-slate-700'} onClick={() => setShowPassword((e) => !e)}>
                      {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </div>
                  }
                />
                <InputText
                  id={'confirmation_password'}
                  name={'confirmation_password'}
                  placeholder={'Masukan konfirmasi password'}
                  label={'konfirmasi password'}
                  type={showPassword ? 'text' : 'password'}
                  required
                  endIcon={
                    <div className={'cursor-pointer text-slate-700'} onClick={() => setShowPassword((e) => !e)}>
                      {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </div>
                  }
                />
                <Button loading={loadingSubmit} onClick={() => formik.handleSubmit()} className={'mt-5'}>
                  Daftar
                </Button>
                <div className={'text-center mt-4'}>
                  Sudah punya akun ? <LinkButton href={ROUTES.SIGN_IN()}>Masuk </LinkButton>
                </div>
              </Grid>
            </div>
          </CardBody>
        </Card>
      </FormikProvider>
    </div>
  );
}
