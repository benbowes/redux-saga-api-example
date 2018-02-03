export function getRecentSearches() {
  try {
    return [...JSON.parse(window.localStorage.getItem('recentSearches'))];
  } catch (err) {
    console.log('No iems exist');
    window.localStorage.setItem('recentSearches', '[]');
    return [];
  }
}

export function addRecentSearch(newSearchItem) {
  const recentSearchesArray = getRecentSearches();
  const newSearchArray = [newSearchItem, ...recentSearchesArray];
  window.localStorage.setItem('recentSearches', JSON.stringify(newSearchArray));
  return getRecentSearches();
}
