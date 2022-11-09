function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'};
  return new Date(date).toLocaleDateString('en-US', options);
}

function filterData(data, query) {
  return data?.filter((item) => item?.concept.toLowerCase().includes(query.toLowerCase()));
}

function filterByType(data, type) {
  return data?.filter((item) => item?.type === type);
}

function orderByDate(data) {
  return data?.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export {
  formatDate,
  filterData,
  filterByType,
  orderByDate
}
