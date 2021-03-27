import { Effect, ImmerReducer } from 'umi';
import { ModelNameSpaces, RootStore } from '@/types';
import * as IndexService from '../services';

export interface listItemProps {
  id: number;
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

export interface dataProps {
  list: listItemProps[];
  page: number;
  pageSize: 10;
  total: number;
  /** 前端附带 */
  hasMore: boolean;
}

export interface meetingProps {
  time: number;
  chairman: string;
  submeet: subMeetItemProps[];
}

export interface IndexModelState {
  data: dataProps;
  metting: meetingProps;
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
    changeDataPage: ImmerReducer<IndexModelState>;
  };
}

export const initialState: IndexModelState = {
  data: {
    list: [],
    page: 0,
    pageSize: 10,
    total: 21,
    hasMore: true,
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
    *getData({ payload }, { call, put, select }) {
      const { page } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.Index]: indexModal } = store;
        const { data } = indexModal;
        return data;
      });
      yield put({
        type: `changeDataPage`,
        payload: page + 1,
      });
      const res = yield call(IndexService.getData, page);
      yield put({
        type: `saveData`,
        payload: res,
      });
    },
    *getForum({ payload }, { call, put, select }) {
      const { page } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.Index]: indexModal } = store;
        const { forum } = indexModal;
        return forum;
      });
      yield put({
        type: `changeForumPage`,
        payload: page + 1,
      });
      const res = yield call(IndexService.getForum, page);
      yield put({
        type: `saveForum`,
        payload: res,
      });
    },
    *getMetting({ payload }, { call, put }) {
      const res = yield call(IndexService.getMetting);
      yield put({
        type: `saveMetting`,
        payload: res,
      });
    },
  },
  reducers: {
    saveData(state, action) {
      const { list, page, pageSize, total } = action.payload;
      state.data = {
        list: [...state.data.list, ...list],
        page,
        pageSize,
        total,
        hasMore: true,
      };
    },
    saveForum(state, action) {
      const { list, page, pageSize, total } = action.payload;
      state.forum = [...state.forum, ...list];
    },
    saveMetting(state, action) {
      state.metting = action.payload;
    },
    changeDataPage(state, action) {
      state.data.page = action.payload;
    },
  },
};

export default IndexModel;
