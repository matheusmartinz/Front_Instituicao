import { Theme } from '@emotion/react';
import { Alert, AlertColor, Snackbar, SxProps } from '@mui/material';

export type TCustomSnackbarProps = {
   showSnackbar: boolean | undefined;
   duration?: number | null | undefined;
   onClose: () => void;
   snackMessage: string;
   severity: AlertColor;
   sx?: SxProps<Theme>;
};

const CustomSnackbar = (props: TCustomSnackbarProps) => {
   const sxArray = Array.isArray(props.sx) ? props.sx : [props.sx].filter(Boolean);
   return (
      <Snackbar
         open={props.showSnackbar}
         autoHideDuration={props.duration || 3000}
         onClose={props.onClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         sx={[...sxArray]}
      >
         <Alert severity={props.severity} sx={{ width: '100%', borderRadius: '20px' }}>
            {props.snackMessage}
         </Alert>
      </Snackbar>
   );
};
export default CustomSnackbar;
