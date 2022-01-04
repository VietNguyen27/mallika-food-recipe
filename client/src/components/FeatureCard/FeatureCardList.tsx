import FeatureCardItem from './FeatureCardItem';

const FeatureCardList = ({ recipes }) => {
  return (
    <ul className='flex flex-col items-stretch'>
      {recipes.map((recipe) => (
        <FeatureCardItem {...recipe} />
      ))}
    </ul>
  );
};

export default FeatureCardList;
