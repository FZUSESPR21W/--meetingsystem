import React, { useEffect, useState } from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Card, List, Skeleton, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './index.less';
import CircleLetter from '../circleLetter';
import { followItemProps } from '@/pages/models';
import { history } from 'umi';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.FollowCard);
interface FollowCardProps {
  triggerFetch: Function;
  triggerFollow: Function;
  data: followItemProps[];
}

const FollowCard = (props: FollowCardProps) => {
  const { data, triggerFetch, triggerFollow } = props;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    await triggerFetch();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFollowClick = async (follow: number) => {
    const value = await triggerFollow(follow);
    if (value !== true) {
      message.error('关注或取消关注失败');
      return;
    }
    if (follow === 0) {
      message.info('关注成功');
    } else {
      message.info('取消关注成功');
    }
  };

  const renderActions = (item: followItemProps) => {
    if (item.follow === 0)
      return [<HeartOutlined onClick={(e) => handleFollowClick(0)} />];
    return [<HeartFilled onClick={(e) => handleFollowClick(1)} />];
  };

  const handleDetailClick = (id: number) => {
    history.push('/detail', id);
  };

  return (
    <Card title="分论坛列表" className={setClsPrefix()}>
      <Skeleton avatar title={false} loading={loading} active>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => {
            return (
              <List.Item
                key={item.id}
                actions={renderActions(item)}
                onClick={(e) => handleDetailClick(item.id)}
              >
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
