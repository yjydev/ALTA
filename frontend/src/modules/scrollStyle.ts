import { mainColor, subColor } from './colorChart';

const scrollStyle = {
  '&::-webkit-scrollbar': {
    width: '3px',
    backgroundColor: mainColor,
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: subColor,
    borderRadius: '10px',
  },
};
export default scrollStyle;
