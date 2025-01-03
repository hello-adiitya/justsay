const colors = [
  'rgb(239, 68, 68)',
  'rgb(234, 88, 12)',
  'rgb(109, 40, 217)',
  'rgb(37, 99, 235)',
  'rgb(22, 163, 74)',
  'rgb(202, 138, 4)',
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};