export const colors = [
  'mediumpurple',
  'darkorchid',
  '#5e55d3',
  'blueviolet',
  'mediumpurple',
  'mediumseagreen',
  '#6ddc81',
  '#7e57d0'
];

const colorsLength = colors.length;

const getCycledColor = ( index ) => {
  return colors[index % colorsLength];
};

export default getCycledColor;
