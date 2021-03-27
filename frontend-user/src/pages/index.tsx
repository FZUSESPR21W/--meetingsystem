import React from 'react';
import { Row, Col } from 'antd';
import { ThemeList } from '@/components';
import styles from './index.less';

export default function IndexPage() {

  return (
    <div className={styles.container}>
      <Row>
        <Col span="8"></Col>
        <Col span="16">
          <ThemeList />
        </Col>
      </Row>
    </div>
  );
}
