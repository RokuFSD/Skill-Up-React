import { capitalizeFirstLetter } from '../../utils/functionUtils.js';
import { useState } from 'react';
import CrossSvg from '../svg/Cross';

const names = {
  desc: 'Más reciente',
  asc: 'Más antiguo',
  topup: 'Cargas',
  payment: 'Pagos'
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
    <div className="flex w-32 h-8 relative">
      <select value={selectValue} className="w-5/6 text-sm rounded" onChange={(e) => onChange(e)}>
        <option className="hidden" disabled value={filter.type}>
          {capitalizeFirstLetter(filter.type)}
        </option>
        {filter?.possibleValues.map((value, index) => (
          <option key={index} value={value}>
            {names[value]}
          </option>
        ))}
      </select>
      {selectValue !== filter?.type && (
        <button
          className="text-sm absolute right-2 -top-2 text-white bg-blue-700 rounded-full"
          onClick={() => handleReset()}>
          <CrossSvg />
        </button>
      )}
    </div>
  );
}

export default FilterDropdown;
