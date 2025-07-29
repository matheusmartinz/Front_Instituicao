import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogProps, IconButton } from '@mui/material';
import React from 'react';

const DialogRoot = styled(Dialog)(() => ({
   '.MuiPaper-root': {
      padding: '40px',
   },
}));

type CustomDialogProps = {
   hideCloseButton?: boolean;
} & DialogProps;

const CustomDialog = (props: CustomDialogProps) => {
   const { ...dialogProps } = props;
   const { onClose, children, id } = dialogProps;

   const getId = () => {
      const sufix = '-dialog';
      return id ? id + sufix : '?';
   };

   const onCloseDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClose && e) {
         onClose(e, 'escapeKeyDown');
      }
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
         {onClose && (
            <IconButton
               onClick={onCloseDialog}
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
