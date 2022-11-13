import { memo } from 'react';
import Search from '../svg/Search.jsx';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function Searchbar({ setQuery, setTriggeredSearch }) {

  function handleChange(e) {
    setTriggeredSearch(true);
    setQuery(e.target.value);
  }

  const debouncedHandleChange = debounce(handleChange, 500);

  return (
    <div className='searchbar w-full relative'>
      <div className='flex absolute inset-y-0 items-center left-0 pl-3 pointer-events-none'>
        <Search />
      </div>
      <input
        className='w-full h-12 pl-12 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500'
        type='text' placeholder='Buscar'
        onChange={debouncedHandleChange} />
    </div>
  );
}

export default memo(Searchbar);
