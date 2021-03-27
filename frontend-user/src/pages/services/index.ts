import { dataProps, followItemProps, meetingProps } from '../models';

const getData = async (
  page: number,
  token: number,
): Promise<{ error_code: number; data: dataProps }> => {
  return {
    error_code: 0,
    data: {
      hasMore: true,
      page: page + 1,
      total: 1000,
      pageSize: 10,
      result: [
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
        {
          id: 1,
          chairman: 'xxx',
          content: 'xxxx',
          issue: 'xxx',
          time: 0,
        },
      ],
    },
  };
};

const getForum = async (
  token: string,
): Promise<{ error_code: number; data: followItemProps[] }> => {
  return {
    error_code: 0,
    data: [
      {
        id: 1,
        follow: 0,
        forum: 'xxx',
      },
      {
        id: 1,
        follow: 1,
        forum: 'xxx',
      },
      {
        id: 1,
        follow: 1,
        forum: 'xxx',
      },
    ],
  };
};

const getMetting = async (): Promise<{
  error_code: number;
  data: meetingProps;
}> => {
  return {
    error_code: 0,
    data: {
      time: 1000,
      chairman: 'xxx',
      submeet: [
        {
          time: 0,
          arrange: 'aaa',
        },
        {
          time: 1,
          arrange: 'bbb',
        },
        {
          time: 2,
          arrange: 'ccc',
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

export { getData, getMetting, getForum, follow };
