import React, { useState } from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Card, Button, List, Skeleton, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './index.less';
import delay from 'delay';
import CircleLetter from '../circleLetter';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.FollowCard);

interface FollowCardProps {}

const FollowCard = (props: FollowCardProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetchData = () => {
    const list = [];
    for (let i = 0; i < 3; i += 1) {
      list.push({
        loading: false,
        value: {
          id: Math.random(),
          issue: 'xxx',
          follow: i % 2,
        },
      });
    }
    return list;
  };

  const onLoadMore = async () => {
    setLoading(true);
    const dataTemp = [...data];
    setData([
      ...dataTemp,
      ...[...new Array(3)].map(() => {
        return { loading: true, value: {} };
      }),
    ]);
    await delay(2000);
    setData([...dataTemp, ...fetchData()]);
    setLoading(false);
  };

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;

  const renderActions = (item) => {
    if (item.loading) {
      return;
    }
    if (item.value.follow === 0) return [<HeartOutlined />];
    return [<HeartFilled />];
  };

  return (
    <Card title="热门关注列表" className={setClsPrefix()}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={(item) => {
          console.log(item);
          return (
            <List.Item key={item.value.id} actions={renderActions(item)}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<CircleLetter letter={item.value.issue} />}
                  title={item.value.issue}
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default FollowCard;
