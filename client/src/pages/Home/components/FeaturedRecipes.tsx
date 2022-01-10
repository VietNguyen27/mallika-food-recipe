import ImageRecipe1 from '@img/recipe-1.png';
import ImageRecipe2 from '@img/recipe-2.png';
import ImageRecipe3 from '@img/recipe-3.png';
import ImageUser1 from '@img/user-1.jfif';
import ImageUser2 from '@img/user-2.jfif';
import ImageUser3 from '@img/user-3.jfif';
import FeatureCardList from '@components/FeatureCard/FeatureCardList';

interface FeaturedCommunityRecipes {
  id: number;
  title: string;
  image: string;
  author: string;
  authorImage: string;
  likes: number;
  reviews: number;
}

export const featuredCommunityRecipes: FeaturedCommunityRecipes[] = [
  {
    id: 1,
    title: 'Resep Ayam Kuah Santan Pedas Lezat',
    image: ImageRecipe1,
    author: 'Gayuh Tri Pinjungwati',
    authorImage: ImageUser1,
    likes: 130,
    reviews: 103,
  },
  {
    id: 2,
    title: 'Resep Ayam Kuah Santan Pedas Lezat',
    image: ImageRecipe2,
    author: 'Nadia Putri',
    authorImage: ImageUser2,
    likes: 130,
    reviews: 103,
  },
  {
    id: 3,
    title: 'Resep Ayam Kuah Santan Pedas Lezat',
    image: ImageRecipe3,
    author: 'Bin',
    authorImage: ImageUser3,
    likes: 130,
    reviews: 103,
  },
];

const FeaturedRecipes = () => {
  return (
    <div className='mt-14'>
      <h1 className='text-xl mb-1 font-medium'>Featured Community Recipes</h1>
      <p className='text-sm text-gray-800 mb-4'>
        Get lots of recipe inspiration from the community
      </p>
      <FeatureCardList recipes={featuredCommunityRecipes} />
      <p className='text-orange text-center mt-8 cursor-pointer'>
        Show All Recipe by Community
      </p>
    </div>
  );
};

export default FeaturedRecipes;
