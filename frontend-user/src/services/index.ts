const login = async (email: string, password: string) => {
  return {
    error_code: 0,
    data: {
      token: 'xxxx',
      username: 'xxx',
      first: 0,
    },
  };
};

const register = async (email: string, password: string) => {
  return {
    error_code: 0,
  };
};

export { login, register };
