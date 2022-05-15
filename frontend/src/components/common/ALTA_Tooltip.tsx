import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { blackColor } from '../../modules/colorChart';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: blackColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: blackColor,
  },
}));

export default function ALTA_Tooltip({ children, title }: Props) {
  return <CustomTooltip title={title}>{children}</CustomTooltip>;
}

type Props = {
  children: any;
  title: string;
};
