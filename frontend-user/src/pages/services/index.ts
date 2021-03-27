import { dataProps, meetingProps } from 'umi';

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

const getMetting = async (): Promise<meetingProps> => {
  return {
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
  };
};

export { getData, getMetting };
