import React from 'react';
import { setClsPrefixHOC } from '@/utils/setClsPrefixHOC';
import { ComponentPrefixs } from '@/constants';
import './index.less';

const setClsPrefix = setClsPrefixHOC(ComponentPrefixs.CircleLetter);

type CircleLetterProps = {
  letter: string;
  onClick:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
};

const CircleLetter = (props: CircleLetterProps) => {
  const { letter, onClick } = props;
  return (
    <div onClick={onClick} className={setClsPrefix()}>
      <div className={setClsPrefix('circle')}> {letter.slice(0, 1)}</div>
    </div>
  );
};

export default CircleLetter;
