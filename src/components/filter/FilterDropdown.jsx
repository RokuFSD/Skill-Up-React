import { capitalizeFirstLetter } from '../../utils/functionUtils.js';
import { useState } from 'react';

const names = {
  'desc': 'Más reciente',
  'asc': 'Más antiguo',
  'topup': 'Cargas',
  'payment': 'Pagos'
};

function FilterDropdown({ id, filter, setFilterValue }) {
  const [selectValue, setSelectValue] = useState(filter?.type);

  function onChange(e) {
    setSelectValue(e.target.value);
    setFilterValue(id, e.target.value, e.target.selectedIndex);
  }

  function handleReset() {
    setSelectValue(filter?.type);
    setFilterValue(id, '', 0);
  }

  return (
    <div className='flex w-32 h-8 relative'>
      <select value={selectValue}
              className='w-5/6 text-sm rounded'
              onChange={(e) => onChange(e)}>
        <option className='hidden' disabled value={filter.type}>{capitalizeFirstLetter(filter.type)}</option>
        {filter?.possibleValues.map((value, index) => (
          <option key={index} value={value}>
            {names[value]}
          </option>
        ))}
      </select>
      {selectValue !== filter?.type && <button
        className='text-sm absolute right-2 -top-2 text-white bg-indigo-500 rounded-full'
        onClick={() => handleReset()}
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'
             xmlns='http://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
      }
    </div>
  );
}

export default FilterDropdown;
