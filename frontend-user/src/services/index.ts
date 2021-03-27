import BASE_URL from '@/constants/base';
import request from 'umi-request';

const login = async (email: string, password: string) => {
  const res = await request.post(`${BASE_URL}/api/user/login`, {
    data: {
      email,
      password,
    },
  });
  return res;
};

const register = async (email: string, password: string, username: string) => {
  const res = await request.post(`${BASE_URL}/api/user/register`, {
    data: {
      email,
      password,
      username,
    },
  });
  return res;
};

export { login, register };
