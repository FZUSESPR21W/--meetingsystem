const queryFollow = async (id: number, token: string) => {
  return {
    error_code: 0,
    data: {
      follow: 0,
    },
  };
};

const getData = async (id: number, page: number, token: string) => {
  return {
    error_code: 0,
    data: {
      page: 0,
      total: 10,
      result: [
        {
          id: 1,
          content: 2,
          time: 3,
          chairman: 4,
          issue: '5455',
        },
      ],
    },
  };
};

const follow = async (id: number, follow_key: number, token: string) => {
  return {
    error_code: 0,
  };
};

export { queryFollow, getData, follow };
