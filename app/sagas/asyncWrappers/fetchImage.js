/** Image preloader */

export const fetchImageWrapper = ( URL ) => {
  return new Promise( ( resolve ) => {
    const preloadImg = new Image();
    preloadImg.onload = () => resolve( URL );
    preloadImg.src = URL;
  })
  .then( URL => URL );
};
