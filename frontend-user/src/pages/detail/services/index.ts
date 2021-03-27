import request from 'umi-request';

const queryFollow = async (id: number, token: string) => {
  const res = await request.post('/api/user/query/follow', {
    data: {
      token,
      id,
    },
  });
  return res;
};

const getData = async (id: number, page: number, token: string) => {
  const res = await request.post('/api/user/forum/message', {
    data: {
      token,
      id,
      page,
    },
  });
  return res;
};

const follow = async (id: number, follow_key: number, token: string) => {
  const res = await request.post('/api/user/follow', {
    data: {
      follow_key,
      token,
      ids: [id],
    },
  });
  return res;
};

export { queryFollow, getData, follow };
