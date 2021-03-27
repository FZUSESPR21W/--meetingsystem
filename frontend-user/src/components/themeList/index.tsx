import React, { useState } from 'react';
import { List, Spin, message } from 'antd';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import CircleLetter from '../circleLetter';
import InfiniteScroll from 'react-infinite-scroller';
import './index.less';

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

const ThemeList = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState(list);

  const fetchData = () => {
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
    return list;
  };

  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    if (data.length >= 30) {
      message.info('没有更多的消息了');
      setHasMore(false);
      setLoading(false);
      return;
    }
    setData([...data, ...fetchData()]);
    setLoading(false);
  };

  return (
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      loadMore={handleInfiniteOnLoad}
      hasMore={hasMore && !loading}
      loader={<Spin />}
    >
      <List
        className={setClsPrefix()}
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<CircleLetter letter="xxx" />}
              description={'时间: ' + item.chairman}
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
  );
};

export default ThemeList;
