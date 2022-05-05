import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import ALTA_ContentsTitle from '../common/ALTA_ContentsTitle';

export default function ALTA_MyPageSkeleton() {
  return (
    <Box
      sx={{ position: 'absolute', minWidth: '100%', top: '20px', zIndex: 100 }}
    >
      <ALTA_ContentsTitle>내 정보</ALTA_ContentsTitle>
      <Box
        sx={{
          position: 'relative',
          height: '300px',
          marginBottom: '30px',
          padding: '40px 20px',
          borderRadius: '10px',
          transition: 'height .3s',
          backgroundColor: '#fff',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Skeleton
            variant="circular"
            sx={{ width: '200px', height: '200px' }}
          />
          <Box sx={{ flex: '1 1 auto', marginLeft: '100px' }}>
            <Skeleton variant="rectangular" sx={{ width: '50%', height: 40 }} />
            <Skeleton variant="text" sx={{ width: '70%', height: 20 }} />
            <Skeleton variant="text" sx={{ width: '92%', height: 100 }} />
            <Skeleton variant="text" sx={{ width: '50%', height: 40 }} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          minWidth: '100%',
          top: '430px',
        }}
      >
        <ALTA_ContentsTitle>스터디 그룹 목록</ALTA_ContentsTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: '14%', height: 50, borderRadius: '5px' }}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: '14%', height: 50, borderRadius: '5px' }}
          />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: 100, borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: 100, borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: 100, borderRadius: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: 100, borderRadius: '5px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
