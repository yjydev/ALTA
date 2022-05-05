import { Box, Skeleton } from '@mui/material';

export default function ALTA_StudyDetailSkeleton() {
  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{ height: '80px', marginBottom: '20px' }}
      />
      <Box sx={{ marginBottom: '30px' }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: '40px', bgcolor: 'secondary.main' }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
      </Box>
      <Box sx={{ marginBottom: '30px' }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: '40px', bgcolor: 'secondary.main' }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
      </Box>
      <Box sx={{ marginBottom: '30px' }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: '40px', bgcolor: 'secondary.main' }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" />
        <Skeleton
          variant="rectangular"
          sx={{
            height: '40px',
            bgcolor: 'rgba(224, 212, 194, 0.6)',
          }}
        />
        <Skeleton variant="rectangular" sx={{ height: '40px' }} />
      </Box>
    </>
  );
}
