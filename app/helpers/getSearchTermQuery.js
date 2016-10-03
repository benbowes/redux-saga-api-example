const getSearchTermQuery = ( searchTerm ) => {
  return searchTerm && searchTerm.replace(/ /g,'+');
};

export default getSearchTermQuery;
