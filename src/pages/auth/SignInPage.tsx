import InputText from '../../components/InputText.tsx';
import Grid from '../../components/Grid.tsx';
import BrandLogo from '../../components/BrandLogo.tsx';
import { ENV } from '../../constants/env.ts';
import Button, { LinkButton } from '../../components/Button.tsx';
import { ROUTES } from '../../routes/routes.ts';

export default function SignInPage() {
  return (
    <div className={'flex min-h-screen'}>
      <div className={'bg-primary-main w-[30%]'}></div>
      <div className={'flex-1 flex items-center justify-center py-24 flex-col'}>
        <div className={'h-full flex justify-between flex-col max-w-sm w-full '}>
          <BrandLogo />
          <div>
            <Grid gap={'md'}>
              <div>
                <h3 className={'text-3xl font-semibold '}>Masuk</h3>
                <div>Masukan email dan password untuk masuk</div>
              </div>
              <InputText id={'email'} name={'email'} label={'email'} placeholder={'masukan email'} required />
              <InputText
                id={'password'}
                name={'password'}
                label={'password'}
                placeholder={'masukan password'}
                required
              />
              <div className={'mt-4 w-full'}>
                <Button fullWidth>Masuk</Button>
              </div>
              <div>
                Belum punya akun ? <LinkButton href={ROUTES.SIGN_UP()}>daftar disini</LinkButton>
              </div>
            </Grid>
          </div>
          <div className={'text-xs text-gray-500'}>V {ENV.VERSION}</div>
        </div>
      </div>
    </div>
  );
}
