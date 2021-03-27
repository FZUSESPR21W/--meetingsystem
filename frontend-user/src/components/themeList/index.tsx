import React, { useEffect, useState } from 'react';
import { List, Spin, message, Card } from 'antd';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import CircleLetter from '../circleLetter';
import InfiniteScroll from 'react-infinite-scroller';
import './index.less';
import { history, listItemProps } from 'umi';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.ThemeList);

const list: any = [];
for (let i = 0; i < 10; i++) {
  list.push({
    id: Math.random(),
    issue: 'Ant Design',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    chairman: '2020/1/0',
  });
}

interface ThemeListProps {
  triggerFetch: Function;
  data: listItemProps[];
  hasMore: boolean;
}

const ThemeList = (props: ThemeListProps) => {
  const { triggerFetch, data, hasMore } = props;
  console.log('*', props);

  const [loading, setLoading] = useState(false);

  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    await triggerFetch();
    setLoading(false);
  };

  const handleDetailClick = (id: number) => {
    history.push('/detail', id);
  };

  useEffect(() => {
    handleInfiniteOnLoad();
  }, []);

  return (
    <Card title="消息列表">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={hasMore && !loading}
      >
        <List
          className={setClsPrefix()}
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={(e) => handleDetailClick(item.id)}
            >
              <List.Item.Meta
                avatar={<CircleLetter letter={item.issue} />}
                description={'时间: ' + item.time}
                title={'#' + item.issue}
              />
              {item.content}
            </List.Item>
          )}
        />
        {loading && hasMore && (
          <div className={setClsPrefix('loading-container')}>
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    </Card>
  );
};

export default ThemeList;
