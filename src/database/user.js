import axios from 'axios';

const instance = axios.create();
const isProd = process.env.NODE_ENV === 'production';
const baseUrl = isProd ? 'https://dev.api.toel.app/user' : 'api';

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      return Promise.reject(error.response.data);
    } catch (e) {
      return Promise.reject(error);
    }
  },
);

const login = (email, password) => instance.post(`/api/user/login`, {
  email,
  password,
});

const userRepository = {
  login,
};

export default userRepository;
