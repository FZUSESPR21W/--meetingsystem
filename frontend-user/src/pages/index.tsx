import React from 'react';
import { Row, Col } from 'antd';
import { ForumCard, ThemeList } from '@/components';
import styles from './index.less';
import FollowCard from '@/components/followCard';
import { useSelector, useDispatch } from 'umi';
import { ModelNameSpaces, RootStore } from '@/types';

export default function IndexPage() {
  const dispatch = useDispatch();
  const { metting, data, forum } = useSelector((store: RootStore) => {
    const { [ModelNameSpaces.Index]: IndexModel } = store;
    return IndexModel;
  });

  const fetchListData = () => {
    dispatch({
      type: `${ModelNameSpaces.Index}/getData`,
    });
  };

  const fetchFollowData = () => {
    dispatch({
      type: `${ModelNameSpaces.Index}/getForum`,
    });
  };

  const fetchForumData = () => {
    dispatch({
      type: `${ModelNameSpaces.Index}/getMetting`,
    });
  };

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span="8">
          <ForumCard data={metting} triggerFetch={fetchForumData} />
          <div className={styles.followCardContainer}>
            <FollowCard triggerFetch={fetchFollowData} data={forum} />
          </div>
        </Col>
        <Col span="16">
          <ThemeList
            triggerFetch={fetchListData}
            data={data.list}
            hasMore={data.hasMore}
          />
        </Col>
      </Row>
    </div>
  );
}
