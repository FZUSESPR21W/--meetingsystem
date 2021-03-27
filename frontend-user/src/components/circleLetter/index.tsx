import React from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import './index.less';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.CircleLetter);

interface CircleLetterProps {
  letter: string;
}

const CircleLetter = (props: CircleLetterProps) => {
  const { letter } = props;
  return (
    <div className={setClsPrefix()}>
      <div className={setClsPrefix('circle')}> {letter.slice(0, 1)}</div>
    </div>
  );
};

export default CircleLetter;
