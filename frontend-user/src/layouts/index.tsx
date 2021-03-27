import React, { useState } from 'react';
import { IRouteComponentProps, Link } from 'umi';
import { Layout as ALayout, Button } from 'antd';
import { UserModal } from '@/components';
import styles from './index.less';

const { Header, Content } = ALayout;

const Layout = ({ children }: IRouteComponentProps) => {
  const [visible, setVisible] = useState(false);

  const isLogin = false;
  return (
    <ALayout>
      <Header>
        <Link to="/">
          <span className="logo">主页</span>
        </Link>
        {isLogin && <span className={styles.name}>huro</span>}
        {!isLogin && (
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
      <UserModal visible={visible} setVisible={setVisible} />
    </ALayout>
  );
};

export default Layout;
