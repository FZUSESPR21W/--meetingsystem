const login = async (username: string, password: string) => {
  return {
    error_code: 0,
    data: {
      token: 'xxxx',
      username: 'xxx',
      first: 0,
    },
  };
};

const register = async (username: string, password: string) => {
  return {
    error_code: 0,
  };
};

export { login, register };
