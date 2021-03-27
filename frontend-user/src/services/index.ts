import request from 'umi-request';

const login = async (email: string, password: string) => {
  const res = await request.post('/api/user/login', {
    data: {
      email,
      password,
    },
  });
  console.log(res);
  return {
    error_code: 0,
    data: {
      token: null,
      username: 'xxx',
      first: 0,
    },
  };
};

const register = async (email: string, password: string) => {
  const res = await request.post('/api/user/register', {
    data: {
      email,
      password,
    },
  });
  console.log(res);
  return {
    error_code: 0,
  };
};

export { login, register };
