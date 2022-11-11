function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

function filterData(data, query, fields) {
  return data?.filter((item) => {
    const values = fields.map((field) => item[field]);
    return values.some((value) => value.toLowerCase().includes(query.toLowerCase()));
  });
}

function filterByType(data, type) {
  if (!type) return data;
  if (type === 'transaction') {
    return data?.filter((item) => item.accountId !== item.to_account_id && item.type === 'payment');
  }
  if( type === 'payment'){
    return data?.filter((item) => item.accountId === item.to_account_id && item.type === 'payment');
  }
  return data?.filter((item) => item?.type === type);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function orderByDate(data, order) {
  if (!order) return data;
  return data?.sort((a, b) => {
    if (order === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });
}

export {
  formatDate,
  filterData,
  filterByType,
  orderByDate,
  capitalizeFirstLetter
};
