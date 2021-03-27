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
  token: window.localStorage.getItem('token') || null,
  username: window.localStorage.getItem('username') || null,
};

const UserModel: UserModelType = {
  namespace: ModelNameSpaces.User,
  state: initialState,
  effects: {
    *login({ payload }, { call, put, select }) {
      const { email, password } = payload;
      const res = yield call(UserService.login, email, password);
      const { error_code, data } = res;
      if (error_code === 0) {
        yield put({
          type: 'saveToken',
          payload: data.token,
        });
        yield put({
          type: 'saveName',
          payload: data.username,
        });
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('username', data.username);
        return true;
      }
      return false;
    },
    *register({ payload }, { call, put, select }) {
      const { email, password } = payload;
      const res = yield call(UserService.register, email, password);
      const { error_code } = res;
      if (error_code === 0) {
        return true;
      }
      return false;
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
