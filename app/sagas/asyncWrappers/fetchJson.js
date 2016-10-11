import fetch from 'isomorphic-fetch'; // Also provides a polyfill for fetch in IE11

/*
* @param {string} url
* @returns {Object}
* @description window.fetch api wrapper, polyfilled by npm module `isomorphic-fetch`
* This implementation always returns the server response.
* If server errors - response is returned by a catch and appended with ok:false.
* Otherwise if all good - response is returned by a then and appended with ok:true. */

export const fetchJsonWrapper = ( url, method = 'GET' ) => {

  return fetch( url, { method: method } )
    .then( response => {
      if ( !response.ok ) {
        throw response; // Send "bad" response to catch()
      } else {
        return response.json(); // Send "good" response to following then()
      }
    })
    .then( response => {
      return { ...response, ...{ ok: true } };
    })
    .catch( response => {
      return { ...response, ...{ ok: false } };
    });

};
