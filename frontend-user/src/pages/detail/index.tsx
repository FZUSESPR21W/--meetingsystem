import React, { useEffect } from 'react';
import styles from './index.less';
import { Row, Col, Card, Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ThemeList } from '@/components';
import { history } from 'umi';

const DetailPage = () => {
  console.log(history.location.state);

  useEffect(() => {
    
  });

  return (
    <div className={styles.container}>
      <Row>
        <Col span="24">
          <Card className={styles.descriptionCard}>
            <h2 className={styles.title}>议题大会</h2>
            <h3 className={styles.chairman}>主席: xxx</h3>
            <div className={styles.desBtnContainer}>
              <Button type="ghost" size="large" icon={<HeartOutlined />}>
                关注
              </Button>
            </div>
          </Card>
        </Col>
        <Col span="24">{/* <ThemeList /> */}</Col>
      </Row>
    </div>
  );
};

export default DetailPage;
