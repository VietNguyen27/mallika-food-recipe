const CategoryItem = ({ image, title }) => {
  return (
    <div className='flex-none py-4 px-2 first:pl-0 last:pr-0'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <img
          src={image}
          alt={`${title} category`}
          className='w-[70px] h-[70px] rounded-xl object-cover'
        />
        <p>{title}</p>
      </div>
    </div>
  );
};
export default CategoryItem;
