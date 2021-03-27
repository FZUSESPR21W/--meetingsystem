import { Effect, ImmerReducer, listItemProps } from 'umi';
import { ModelNameSpaces, RootStore } from '@/types';
import * as DetailService from '../services';

export interface DetailModelState {
  isFollow: boolean;
  page: number;
  total: number;
  pageSize: 10;
  hasMore: boolean;
  list: listItemProps[];
}

export interface DetailModelType {
  namespace: ModelNameSpaces.Detail;
  state: DetailModelState;
  effects: {
    queryFollow: Effect;
    getData: Effect;
    follow: Effect;
  };
  reducers: {
    changePage: ImmerReducer<DetailModelState>;
    saveData: ImmerReducer<DetailModelState>;
    changeFollow: ImmerReducer<DetailModelState>;
  };
}

export const initialState: DetailModelState = {
  isFollow: false,
  page: 0,
  total: 10,
  pageSize: 10,
  hasMore: true,
  list: [],
};

const DetailModel: DetailModelType = {
  namespace: ModelNameSpaces.Detail,
  state: initialState,
  effects: {
    *queryFollow({ payload }, { call, put, select }) {
      const follow = payload;
      const res = yield call(DetailService.queryFollow, follow);
      yield put({
        type: 'changeFollow',
        payload: res.data.follow,
      });
    },
    *getData({ payload }, { call, put, select }) {
      const { page } = yield select((store: RootStore) => {
        const { [ModelNameSpaces.Detail]: DetailModal } = store;
        return DetailModal;
      });
      yield put({
        type: `changePage`,
        payload: page + 1,
      });
      const res = yield call(DetailService.getData, page);
      yield put({
        type: `saveData`,
        payload: res.data,
      });
    },
    *follow({ payload }, { call, put, select }) {
      const follow = payload;
      const res = yield call(DetailService.follow, follow);
      yield put({
        type: 'changeFollow',
        payload: follow,
      });
      return res['error_code'] === 0;
    },
  },
  reducers: {
    saveData(state, action) {
      const { result, page, total } = action.payload;
      state.list = [...state.list, ...result];
      state.total = total;
      state.hasMore = true;
    },
    changePage(state, action) {
      state.page = action.payload;
    },
    changeFollow(state, action) {
      state.isFollow = action.payload;
    },
  },
};

export default DetailModel;
