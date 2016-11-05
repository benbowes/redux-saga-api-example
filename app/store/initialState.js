/*
* @description initial state that we inject into our redux store at bootup.
*/

export const initialState = (routeSearchStr) => {
  return {
    imageSearch: {
      searchTerm: (routeSearchStr !== '') ? routeSearchStr: 'Gif Driven Development',
      searchOffset: 0
    }
  };
};
