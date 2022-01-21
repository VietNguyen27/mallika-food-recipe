import { ReactChild, ReactChildren } from 'react';

interface FeatureCardListProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
}

const FeatureCardList: React.FC<FeatureCardListProps> = ({ children }) => {
  return <ul className='flex flex-col items-stretch list-none'>{children}</ul>;
};

export default FeatureCardList;
