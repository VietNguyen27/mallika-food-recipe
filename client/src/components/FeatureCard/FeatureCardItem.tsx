import { Heart16Filled, Heart24Regular } from '@fluentui/react-icons';

const FeatureCardItem = ({
  image,
  title,
  authorImage,
  author,
  likes,
  reviews,
}) => {
  return (
    <li className='mb-8 last:mb-0'>
      <div className='cursor-pointer'>
        <img src={image} alt='soup' className='rounded-2xl' />
      </div>
      <h2 className='text-lg mt-2 mb-2 font-medium leading-6'>{title}</h2>
      <div className='flex items-center mt-1 relative'>
        <img
          src={authorImage}
          alt='user image'
          className='w-[40px] h-[40px] object-cover rounded-full mr-3'
        />
        <div>
          <p className='text-md'>{author}</p>
          <div className='text-xs flex items-center text-gray-800'>
            <p className='flex'>
              <Heart16Filled className='mr-1 text-orange inline-block' />
              <span>{likes}</span>
            </p>
            <span className='mx-2'>&#183;</span>
            <p>
              <span className='mr-1'>{reviews}</span>
              <span>Reviews</span>
            </p>
          </div>
        </div>
        <Heart24Regular className='text-orange absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer' />
      </div>
    </li>
  );
};

export default FeatureCardItem;
