import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.ts';

export default class ErrorService {
  private auth = useAuth();

  private handleSnackbar(message: string) {
    toast.error(message);
  }

  public fetchApiError(error: AxiosError<any>) {
    if (error?.response?.status === 401) {
      this.auth.logOut();
    } else {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        message = error?.response?.data?.errors?.message
          ? error?.response?.data?.errors?.message
          : 'Terjadi Kesalahan Pada Sistem';
      } else message = String(error);
      return this.handleSnackbar(message);
    }
  }
}
