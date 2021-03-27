import React, { useState } from 'react';
import { IRouteComponentProps, Link, useDispatch, useSelector } from 'umi';
import { Layout as ALayout, Button } from 'antd';
import { UserModal } from '@/components';
import styles from './index.less';
import { ModelNameSpaces, RootStore } from '@/types';

const { Header, Content } = ALayout;

const Layout = ({ children }: IRouteComponentProps) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((store: RootStore) => {
    const { [ModelNameSpaces.User]: UserModal } = store;
    return UserModal;
  });

  const login = (payload: { username: string; password: string }) => {
    dispatch({
      type: `${ModelNameSpaces.User}/login`,
      payload,
    });
  };

  const register = (payload: { username: string; password: string }) => {
    dispatch({
      type: `${ModelNameSpaces.User}/register`,
      payload,
    });
  };

  return (
    <ALayout>
      <Header>
        <Link to="/">
          <span className="logo">主页</span>
        </Link>
        {token && <span className={styles.name}>huro</span>}
        {!token && (
          <Button
            type="primary"
            ghost
            className={styles.signInBtn}
            onClick={() => setVisible(true)}
          >
            登录
          </Button>
        )}
      </Header>
      <Content>{children}</Content>
      <UserModal visible={visible} setVisible={setVisible} login={login} register={register}/>
    </ALayout>
  );
};

export default Layout;
