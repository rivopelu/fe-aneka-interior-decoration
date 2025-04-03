import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../constants/local-storage-key.ts';
import { IResGetMe } from '../types/response/IResGetMe.ts';
import { IReqSignIn } from '../types/request/IReqSignIn.ts';
import { ENDPOINT } from '../constants/endpoint.ts';
import { BaseResponse } from '../types/response/IResModel.ts';
import { IResSIgnIn } from '../types/response/IResSignIn.ts';
import { ROUTES } from '../routes/routes.ts';
import { HttpService } from '../services/http.service.ts';
import { AuthContext } from '../context/AuthContext.ts';
import ErrorService from '../services/error.service.ts';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const rawUser = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  const getToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const rawPrivileges = localStorage.getItem(LOCAL_STORAGE_KEY.PRIVILEGES);
  const privilege = rawPrivileges ? JSON.parse(rawPrivileges) : [];
  const getUser = rawUser ? JSON.parse(rawUser) : undefined;
  const [token, setToken] = useState<string | undefined>(getToken || undefined);
  const [user, setUser] = useState<IResGetMe | undefined>(getUser || undefined);
  const navigate = useNavigate();
  const httpService = new HttpService();
  const errorService = new ErrorService();

  function loginAction(data: IReqSignIn, setLoading: (loading: boolean) => void) {
    setLoading(true);
    httpService
      .POST(ENDPOINT.SIGN_IN(), data)
      .then((res: BaseResponse<IResSIgnIn>) => {
        setLoading(false);
        const resToken = res.data.response_data.access_token;
        const userData = res.data.response_data.user_data;
        setToken(resToken);
        setUser(userData);
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, resToken);
        localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(userData));
        localStorage.setItem(LOCAL_STORAGE_KEY.PRIVILEGES, JSON.stringify(privilege));
        toast.success("Berhasil masuk")
        navigate(ROUTES.HOME());
      })
      .catch((e) => {
        setLoading(false);
        errorService.fetchApiError(e);
      });
  }

  const logOut = () => {
    setToken(undefined);
    setUser(undefined);
    localStorage.clear();
    navigate(ROUTES.SIGN_IN());
  };

  return <AuthContext value={{ token, loginAction, logOut, user }}>{children}</AuthContext>;
};

export default AuthProvider;

export interface IAuthProviderProps {
  user?: IResGetMe;
  token?: string;
  loginAction: (data: IReqSignIn, setLoading: (data: boolean) => void) => void;
  logOut: () => void;
}
