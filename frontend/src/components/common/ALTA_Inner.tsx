import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
};
export default function ALTA_Inner({ children }: Props) {
  return (
    <Box className="ALTAInner" sx={ALTAInner_style}>
      {children}
    </Box>
  );
}

const ALTAInner_style = {
  minWidth: '900px',
  maxWidth: '900px',
  height: '100%',
  margin: '0 auto',
  backgroundColor: 'inherit',
};
