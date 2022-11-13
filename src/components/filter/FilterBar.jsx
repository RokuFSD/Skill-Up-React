import FilterDropdown from './FilterDropdown.jsx';

export const filtersArr = [
  {
    type: 'Fecha',
    value: '',
    possibleValues: ['desc', 'asc'],
    position: 0
  },
  {
    type: 'Tipo',
    value: '',
    possibleValues: ['topup', 'payment'],
    position: 0
  }
];


function FilterBar({ filters, setTriggeredSearch, setFilters, setTriggeredFilter }) {
  const setFilterValue = (filterIndex, value, position) => {
    setTriggeredSearch(true);
    setTriggeredFilter(true);
    const newFilters = [...filters];
    newFilters[filterIndex] = {
      ...newFilters[filterIndex],
      value,
      position
    };
    setFilters(newFilters);
  };

  return (
    <div className='flex items-center gap-2 w-full'>
      {filters.map((filter, index) => (
        <FilterDropdown key={index} id={index} filter={filter} setFilterValue={setFilterValue} />
      ))}
    </div>
  );
}

export default FilterBar;
