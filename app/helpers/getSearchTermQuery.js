export const getSearchTermQuery = ( searchTerm ) => {
  return searchTerm && searchTerm.replace(/ /g,'+');
};
