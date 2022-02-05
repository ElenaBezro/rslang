import axios from 'axios';
import { User } from '~/types';

type AuthResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

const signIn = (credentials: { email: string; password: string }) => axios.post<AuthResponse>('/signin', credentials).then(response => {
  const { userId: id, name, token, refreshToken } = response.data;
  const user: User = { ...credentials, name, id };
  return [user, token, refreshToken] as const;
});

export { signIn };