import axios from 'axios';
import { apiUrl } from './urls';

export const serverAPI = axios.create({
  baseURL: apiUrl,
});
