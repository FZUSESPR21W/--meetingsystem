import { Effect, ImmerReducer } from 'umi';
import { ModelNameSpaces } from '@/types';

export interface listItemProps {
  id: string;
  content: string;
  time: number;
  chairman: string;
  issue: string;
}

export interface subMeetItemProps {
  time: number;
  arrange: string;
}

export interface followItemProps {
  follow: number;
  forum: string;
  id: number;
}

export interface IndexModelState {
  data: {
    list: listItemProps[];
    page: number;
    pageSize: 10;
    total: number;
  };
  metting: {
    time: number;
    chairman: string;
    submeet: subMeetItemProps[];
  };
  forum: followItemProps[];
}

export interface IndexModelType {
  namespace: ModelNameSpaces.Index;
  state: IndexModelState;
  effects: {
    /** 获取关注论坛信息数据 */
    getData: Effect;
    /** 获取分论坛信息列表 */
    getForum: Effect;
    /** 获取会议议程数据 */
    getMetting: Effect;
  };
  reducers: {
    saveData: ImmerReducer<IndexModelState>;
    saveForum: ImmerReducer<IndexModelState>;
    saveMetting: ImmerReducer<IndexModelState>;
    changeForumPage: ImmerReducer<IndexModelState>;
    changeDataPage: ImmerReducer<IndexModelState>;
  };
}

export const initialState: IndexModelState = {
  data: {
    list: [],
    page: 0,
    pageSize: 10,
    total: 21,
  },
  metting: {
    time: 0,
    chairman: 'xxx',
    submeet: [],
  },
  forum: [],
};

const IndexModel: IndexModelType = {
  namespace: ModelNameSpaces.Index,
  state: initialState,
  effects: {
    *getData({ payload }, { call, put }) {
      console.log(payload);
    },
    *getForum({ payload }, { call, put }) {
      console.log(payload);
    },
    *getMetting({ payload }, { call, put }) {
      console.log(payload);
    },
  },
  reducers: {
    saveData(state, action) {
      console.log(action);
    },
    saveForum(state, action) {
      console.log(action);
    },
    saveMetting(state, action) {
      console.log(action);
    },
    changeForumPage(state, action) {},
    changeDataPage(state, action) {},
  },
};

export default IndexModel;
