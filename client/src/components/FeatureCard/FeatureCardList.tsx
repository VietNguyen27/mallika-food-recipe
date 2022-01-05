import FeatureCardItem from './FeatureCardItem';

const FeatureCardList = ({ recipes }) => {
  return (
    <ul className='flex flex-col items-stretch'>
      {recipes.map((recipe) => (
        <FeatureCardItem key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
};

export default FeatureCardList;
