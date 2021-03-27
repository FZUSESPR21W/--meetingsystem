import React from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import { Timeline, Card, Descriptions } from 'antd';
import './index.less';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.ForumCard);

interface ForumCardProps {}

const ForumCard = (props: ForumCardProps) => {
  return (
    <Card title="xxxx会议">
      <Descriptions title={null}>
        <Descriptions.Item label="chairman">主席</Descriptions.Item>
        <Descriptions.Item label="beginTime">开始时间</Descriptions.Item>
      </Descriptions>
      <Timeline mode="left" className={setClsPrefix("timeline")}>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default ForumCard;
