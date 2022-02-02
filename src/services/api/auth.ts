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
  const { userId: id, name } = response.data;
  const user: User = { ...credentials, name, id };
  return user;
});

export { signIn };