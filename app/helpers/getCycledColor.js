export const colors = [
  'mediumpurple',
  'mediumaquamarine',
  'mediumorchid',
  'blueviolet',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred'
];

const colorsLength = colors.length;

const getCycledColor = ( index ) => {
  return colors[index % colorsLength];
};

export default getCycledColor;
