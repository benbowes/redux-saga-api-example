export const colors = [
  'mediumpurple',
  '#9e7cdf',
  '#ad8ce3',
  '#b595e6',
  '#bb9ce8',
  '#c2a3ea',
  '#c8aaec',
  '#d1b4ef'
];

const colorsLength = colors.length;

const getCycledColor = ( index ) => {
  return colors[index % colorsLength];
};

export default getCycledColor;
