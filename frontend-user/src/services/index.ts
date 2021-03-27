import request from 'umi-request';

const login = async (email: string, password: string) => {
  const res = await request.post('/api/user/login', {
    data: {
      email,
      password,
    },
  });
  return res;
};

const register = async (email: string, password: string, username: string) => {
  const res = await request.post('/api/user/register', {
    data: {
      email,
      password,
      username,
    },
  });
  console.log(res);
  return {
    error_code: 0,
  };
};

export { login, register };
