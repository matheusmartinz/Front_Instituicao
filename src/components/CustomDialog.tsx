import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogProps, IconButton } from '@mui/material';

const DialogRoot = styled(Dialog)(() => ({
   '.MuiPaper-root': {
      padding: '40px',
   },
}));

type CustomDialogProps = {
   hideCloseButton?: boolean;
} & DialogProps;

const CustomDialog = (props: CustomDialogProps) => {
   const { hideCloseButton, ...dialogProps } = props;
   const { onClose, children, id } = dialogProps;

   const getId = () => {
      const sufix = '-dialog';
      return id ? id + sufix : 'blabla';
   };

   return (
      <DialogRoot
         {...dialogProps}
         sx={{
            maxHeight: '85vh',
            marginTop: '3.5%',
         }}
         id={getId()}
      >
         {onClose && !hideCloseButton && (
            <IconButton
               onClick={e => {
                  onClose?.(e, 'escapeKeyDown');
               }}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500],
               }}
            >
               <CloseIcon />
            </IconButton>
         )}
         {children}
      </DialogRoot>
   );
};

export default CustomDialog;
