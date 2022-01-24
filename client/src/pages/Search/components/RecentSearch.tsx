import Icon, { IconTypes } from '@components/Icon/Icon';

const recentSearch = ['Sayur', 'Ayum', 'Ayam', 'Ayam'];

const RecentSearch = () => {
  return (
    <>
      <h1 className='text-xl font-medium py-4 px-layout'>Recent Search</h1>
      <ul>
        {recentSearch.map((val, key) => (
          <li
            className='relative px-layout py-3 border-b border-gray-400'
            key={key}
          >
            <span>{val}</span>
            <button
              className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-800'
              tabIndex={-1}
            >
              <Icon type={IconTypes.OUTLINED} size={24} icon='close' />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentSearch;
