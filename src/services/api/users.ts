import axios from 'axios';
import { User } from '~/types';

const createUser = (user: Omit<User, 'id'>) => axios.post('/users', user);

const getUserById = (userId: User['id']) => axios.get(`/users/${userId}`);

const updateUser = (user: User) => axios.put(`/users/${user.id}`, user);

const deleteUser = (userId: User['id']) => axios.delete(`/users/${userId}`);

export { createUser, getUserById, updateUser, deleteUser };