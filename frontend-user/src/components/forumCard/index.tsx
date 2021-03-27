import React, { useEffect } from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Timeline, Card, Descriptions } from 'antd';
import './index.less';
import { meetingProps } from 'umi';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.ForumCard);

interface ForumCardProps {
  data: meetingProps;
  triggerFetch: Function;
}

const ForumCard = (props: ForumCardProps) => {
  const { data, triggerFetch } = props;
  const { chairman, time, submeet } = data;
  useEffect(() => {
    triggerFetch();
  }, []);
  return (
    <Card title="本站第一次会议">
      <Descriptions title={null}>
        <Descriptions.Item label="chairman">{chairman}</Descriptions.Item>
        <Descriptions.Item label="beginTime">{time}</Descriptions.Item>
      </Descriptions>
      <Timeline mode="left" className={setClsPrefix('timeline')}>
        {submeet.map((value) => (
          <Timeline.Item>
            {value.arrange} {value.time}
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default ForumCard;
