import React, { useEffect } from 'react';
import styles from './index.less';
import { Row, Col, Card, Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ThemeList } from '@/components';
import { history, useDispatch, useSelector } from 'umi';
import { ModelNameSpaces, RootStore } from '@/types';

const DetailPage = () => {
  const id = history.location.state;
  const dispatch = useDispatch();
  const { list, isFollow } = useSelector((store: RootStore) => {
    const { [ModelNameSpaces.Detail]: DetailModel } = store;
    return DetailModel;
  });

  useEffect(() => {
    dispatch({
      type: `${ModelNameSpaces.Detail}/queryFollow`,
      payload: id,
    });
  }, []);

  const triggerFetch = () => {
    dispatch({
      type: `${ModelNameSpaces.Detail}/getData`,
      payload: id,
    });
  };

  const handleFollowClick = async (follow: number) => {
    const value = await dispatch({
      type: `${ModelNameSpaces.Detail}/follow`,
      payload: { id, follow },
    });
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col span="24">
          <Card className={styles.descriptionCard}>
            <h2 className={styles.title}>{list[0] && list[0].issue}</h2>
            <h3 className={styles.chairman}>
              主席: {list[0] && list[0].chairman}
            </h3>
            <div className={styles.desBtnContainer}>
              {!isFollow && (
                <Button
                  type="ghost"
                  size="large"
                  icon={<HeartOutlined />}
                  onClick={(e) => handleFollowClick(0)}
                >
                  关注
                </Button>
              )}
              {isFollow && (
                <Button
                  type="ghost"
                  size="large"
                  icon={<HeartFilled />}
                  onClick={(e) => handleFollowClick(1)}
                >
                  取消关注
                </Button>
              )}
            </div>
          </Card>
        </Col>
        <Col span="24">
          <ThemeList triggerFetch={triggerFetch} hasMore={true} data={list} />
        </Col>
      </Row>
    </div>
  );
};

export default DetailPage;
