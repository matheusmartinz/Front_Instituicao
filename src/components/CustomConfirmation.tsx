import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CustomTypography from './CustomTypography';

export type TCustomConfirmationProps = {
      open: boolean;
      onCloseDialog: () => void;
      onDelete: () => void;
      onCancel: () => void;
      dialogTitle: string;
      dialogText: string;
};

const CustomConfirmation = (props: TCustomConfirmationProps) => {
      return (
            <Dialog
                  open={props.open}
                  onClose={props.onCloseDialog}
                  aria-labelledby="responsive-dialog-title"
                  sx={{ height: '40%' }}
            >
                  <DialogTitle>
                        <CustomTypography title={props.dialogTitle} color="black" fontSize="19px" />
                  </DialogTitle>
                  <DialogContent>
                        <DialogContentText>
                              <CustomTypography title={props.dialogText} color="black" noFontWeight />
                        </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                        <Button
                              autoFocus
                              onClick={props.onCancel}
                              sx={{
                                    bgcolor: 'purple',
                                    borderRadius: '50px',
                                    color: 'white',
                                    fontWeight: 'bold',
                              }}
                        >
                              NÃO
                        </Button>
                        <Button
                              onClick={props.onDelete}
                              autoFocus
                              sx={{
                                    bgcolor: 'purple',
                                    borderRadius: '50px',
                                    color: 'white',
                                    fontWeight: 'bold',
                              }}
                        >
                              SIM
                        </Button>
                  </DialogActions>
            </Dialog>
      );
};

export default CustomConfirmation;
