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
  result: listItemProps[];
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
    /** 关注和取消关注 */
    follow: Effect;
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
    result: [],
    page: 0,
    pageSize: 10,
    total: 21,
    hasMore: true,
  },
  metting: {
    time: 0,
    chairman: '',
    submeet: [],
  },
  forum: [],
};

const IndexModel: IndexModelType = {
  namespace: ModelNameSpaces.Index,
  state: initialState,
  effects: {
    *follow({ payload }, { call, put, select }) {
      const { token } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.User]: UserModal } = store;
        return UserModal;
      });
      const { id, follow } = payload;
      const res = yield call(IndexService.follow, id, follow, token);
      return res['error_code'] === 0;
    },
    *getData({ payload }, { call, put, select }) {
      const { token } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.User]: UserModal } = store;
        return UserModal;
      });
      const { page } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.Index]: indexModal } = store;
        const { data } = indexModal;
        return data;
      });
      yield put({
        type: `changeDataPage`,
        payload: page + 1,
      });
      const res = yield call(IndexService.getData, page, token);
      yield put({
        type: `saveData`,
        payload: res.data,
      });
    },
    *getForum({ payload }, { call, put, select }) {
      const { token } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.User]: UserModal } = store;
        return UserModal;
      });
      const res = yield call(IndexService.getForum, token);
      yield put({
        type: `saveForum`,
        payload: res.data,
      });
    },
    *getMetting({ payload }, { call, put }) {
      const res = yield call(IndexService.getMetting);
      yield put({
        type: `saveMetting`,
        payload: res.data,
      });
    },
  },
  reducers: {
    saveData(state, action) {
      const { result, page, pageSize, total } = action.payload;
      state.data = {
        result: [...state.data.result, ...result],
        page,
        pageSize,
        total,
        hasMore: true,
      };
    },
    saveForum(state, action) {
      const list = action.payload;
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
