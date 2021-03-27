import React, { useEffect, useState } from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Card, List, Skeleton, Avatar } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './index.less';
import CircleLetter from '../circleLetter';
import { followItemProps } from '@/pages/models';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.FollowCard);
interface FollowCardProps {
  triggerFetch: Function;
  data: followItemProps[];
}

const FollowCard = (props: FollowCardProps) => {
  const { data, triggerFetch } = props;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await triggerFetch();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderActions = (item: followItemProps) => {
    if (item.follow === 0) return [<HeartOutlined />];
    return [<HeartFilled />];
  };

  return (
    <Card title="分论坛列表" className={setClsPrefix()}>
      <Skeleton avatar title={false} loading={loading} active>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => {
            return (
              <List.Item key={item.id} actions={renderActions(item)}>
                <List.Item.Meta
                  avatar={<CircleLetter letter={item.forum} />}
                  title={item.forum}
                />
              </List.Item>
            );
          }}
        />
      </Skeleton>
    </Card>
  );
};

export default FollowCard;
