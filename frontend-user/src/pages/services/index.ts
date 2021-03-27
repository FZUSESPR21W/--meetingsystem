import { dataProps } from 'umi';

const getData = async (page: number): Promise<dataProps> => {
  return {
    list: [
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
    page: page + 1,
    pageSize: 10,
    hasMore: true,
    total: 1000,
  };
};

export { getData };
