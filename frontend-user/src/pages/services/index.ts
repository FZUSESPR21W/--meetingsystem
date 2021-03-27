import { dataProps, followItemProps, meetingProps } from '../models';
import request from 'umi-request';
import BASE_URL from '@/constants/base';

const getData = async (
  page: number,
  token: number,
): Promise<{ error_code: number; data: dataProps }> => {
  const res = await request.post(`${BASE_URL}/api/user/forum/message`, {
    data: {
      page,
      token,
    },
  });
  return res;
};

const getForum = async (
  token: string,
): Promise<{ error_code: number; data: followItemProps[] }> => {
  const res = await request.post(`${BASE_URL}/api/user/forum/list`, {
    data: {
      token,
    },
  });
  return res;
};

const getMetting = async (): Promise<{
  error_code: number;
  data: meetingProps;
}> => {
  const res = await request.get(`${BASE_URL}/api/user/meeting`);
  return res;
};

const follow = async (id: number, follow_key: number, token: string) => {
  const res = await request.post(`${BASE_URL}/api/user/follow`, {
    data: {
      follow_key,
      token,
      ids: [id],
    },
  });
  return res;
};

export { getData, getMetting, getForum, follow };
