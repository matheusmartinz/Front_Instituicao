import { Alert, AlertColor, Snackbar } from '@mui/material';

export type TCustomSnackbarProps = {
   showSnackbar: boolean | undefined;
   duration: number | null | undefined;
   onClose: () => void;
   snackMessage: string;
   severity: AlertColor;
};

const CustomSnackbar = (props: TCustomSnackbarProps) => {
   return (
      <Snackbar
         open={props.showSnackbar}
         autoHideDuration={props.duration}
         onClose={props.onClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
         <Alert severity={props.severity} sx={{ width: '100%', borderRadius: '20px' }}>
            {props.snackMessage}
         </Alert>
      </Snackbar>
   );
};
export default CustomSnackbar;
