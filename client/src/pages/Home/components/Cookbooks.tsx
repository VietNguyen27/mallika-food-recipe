import { useState } from 'react';
import UnionImage from '@img/union.png';
import Image1 from '@img/landing-page.jfif';
import Image2 from '@img/recipe-1.png';
import Image3 from '@img/recipe-8.png';

interface SliderItemTypes {
  title: string;
  image: string;
  description: string;
}

const steps: SliderItemTypes[] = [
  {
    title: 'Buku resep spesial antara',
    image: Image1,
    description: 'Keep it easy with these simple but delicious recipes',
  },
  {
    title: 'Sup Makaroni Daging',
    image: Image2,
    description: 'Not only is it delicious, but you can clean it up in a flash',
  },
  {
    title: 'Resep Garang Asem Ayam Kampung',
    image: Image3,
    description: 'Keeping It Simple · Easy Weeknight One-pot Recipes',
  },
];

const Cookbooks = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { title, image, description } = steps[currentStep];

  return (
    <div className='relative mt-8 w-full'>
      <h1 className='text-xl mb-4 font-medium'>Cookbooks</h1>
      <span className='absolute top-0 right-0 m-1 text-gray-800'>
        {currentStep + 1}/{steps.length}
      </span>
      <div className='border border-gray-300 rounded-2xl bg-white p-2 mt-1'>
        <div className='relative h-2/5'>
          <img
            src={image}
            className='rounded-2xl w-full h-full object-cover'
            alt='cookbooks cover'
          />
        </div>
        <div className='relative w-full h-3/5 -mt-14 flex items-center justify-center'>
          <div className='rounded-2xl flex items-center justify-center flex-col text-center h-full mb-auto bg-white py-5 mx-4'>
            <div className='p-3 border border-gray-400 rounded-full mb-3'>
              <img
                src={UnionImage}
                width={20}
                alt='logo of mallika food recipe app'
              />
            </div>
            <h1 className='text-xl mb-3 font-medium'>{title}</h1>
            <p className='text-sm text-gray-800 mb-3'>{description}</p>
            <div className='relative before:absolute before:top-0 before:bottom-0 before:bg-gray-400 before:w-px flex justify-around text-center font-medium w-full items-center'>
              <div>
                <span className='mr-3'>1,3k</span>
                <span>Likes</span>
              </div>
              <div>
                <span className='mr-3'>7</span>
                <span>Recipes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute left-1/2 flex gap-2 py-4 -translate-x-1/2'>
        {steps.map((_, index) => (
          <span
            key={index}
            className={`${
              currentStep === index ? 'bg-orange' : 'bg-transparent'
            } w-2 h-2 border border-orange rounded-full cursor-pointer`}
            onClick={() => setCurrentStep(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Cookbooks;
