import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const StyledCheckboxComponent = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.success.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
}));

export const StyledCheckbox = (props: any) => (
  <StyledCheckboxComponent
    {...props}
    icon={<RadioButtonUncheckedIcon />}
    checkedIcon={<CheckCircleIcon />}
  />
);

export default StyledCheckbox;