import { Effect, ImmerReducer } from 'umi';
import { ModelNameSpaces } from '@/types';
import * as UserService from '../services';

interface UserModelState {
  token: string | null;
  username: string | null;
}

export interface UserModelType {
  namespace: ModelNameSpaces.User;
  state: UserModelState;
  effects: {
    login: Effect;
    register: Effect;
  };
  reducers: {
    saveToken: ImmerReducer<UserModelState>;
    saveName: ImmerReducer<UserModelState>;
  };
}

export const initialState: UserModelState = {
  token: null,
  username: null,
};

const UserModel: UserModelType = {
  namespace: ModelNameSpaces.User,
  state: initialState,
  effects: {
    *login({ payload }, { call, put, select }) {
      const { username, password } = payload;
      const res = yield call(UserService.login, username, password);
      const { error_code, data } = res;

      yield put({
        type: 'saveToken',
        payload: data.token,
      });
      yield put({
        type: 'saveName',
        payload: data.username,
      });
    },
    *register({ payload }, { call, put, select }) {
      const { username, password } = payload;
      const res = yield call(UserService.register, username, password);
      const { error_code } = res;
      console.log(error_code);
    },
  },
  reducers: {
    saveToken(state, action) {
      console.log(action.payload);
      state.token = action.payload;
    },
    saveName(state, action) {
      state.username = action.payload;
    },
  },
};

export default UserModel;
