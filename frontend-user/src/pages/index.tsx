import React from 'react';
import { Row, Col } from 'antd';
import { ForumCard, ThemeList } from '@/components';
import styles from './index.less';

export default function IndexPage() {

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span="8">
          <ForumCard />
        </Col>
        <Col span="16">
          <ThemeList />
        </Col>
      </Row>
    </div>
  );
}
