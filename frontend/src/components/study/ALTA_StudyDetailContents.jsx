import { Box } from '@mui/material';

import scrollStyle from '../../modules/scrollStyle';

import ALTA_ProblemTable from './ALTA_ProblemTable';

export default function ALTA_StudyDetailContents() {
  return (
    <Box sx={[wrapper, scrollStyle]}>
      {[0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <ALTA_ProblemTable key={i} sx={wrapper} />
      ))}
    </Box>
  );
}

const wrapper = {
  width: '100%',
  minWidth: '900px',
  height: '85vh',
  padding: '10px 20px',
  paddingBottom: '0.1px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  overflowY: 'scroll',
};
