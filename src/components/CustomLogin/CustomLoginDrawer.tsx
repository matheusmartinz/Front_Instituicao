import { Box, Drawer, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import CustomButton from '../CustomButton';
import CustomIcon from '../CustomIcon';
import CustomTypography from '../CustomTypography';

export type TCustomLoginDrawer = {
   drawer: boolean;
   onClose: () => void;
   text1?: string;
   text2?: string;
   imageUser: string;
   onClick: () => void;
   onConfig: () => void;
};

const initialState = {
   anchorEl: null as null | HTMLElement,
};

const CustomLoginDrawer = (props: TCustomLoginDrawer) => {
   const [stateLocal, setStateLocal] = useState(initialState);
   // eslint-disable-next-line no-undef
   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         anchorEl: event.currentTarget,
      }));
   };

   const onCloseMenu = () => {
      setStateLocal(prevState => ({
         ...prevState,
         anchorEl: null,
      }));
   };

   return (
      <>
         <Drawer anchor="right" open={props.drawer} onClose={props.onClose}>
            <Box sx={{ width: 250, padding: 2 }}>
               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <img style={{ width: '35%', paddingBottom: '28px' }} src={props.imageUser} />
               </Box>
               <Box
                  sx={{
                     height: '20%',
                     justifyContent: 'space-between',
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <CustomTypography title={props.text1} color="black" fontSize="14px" />
                  <CustomTypography title={props.text2} color="black" fontSize="13px" />
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     marginTop: '30%',
                     justifyContent: 'end',
                     marginRight: '5px',
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                     }}
                  >
                     <CustomButton
                        onClick={handleMenuClick}
                        sx={{
                           borderRadius: '100%',
                           height: '35px',
                           width: '35px',
                           padding: 0,
                           minWidth: 'auto',
                        }}
                        children={<CustomIcon className="fa-solid fa-gear" id="" fontSize="17px" />}
                     />

                     <Menu
                        open={!!stateLocal.anchorEl}
                        onClose={onCloseMenu}
                        anchorEl={stateLocal.anchorEl}
                        anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'center',
                        }}
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'center',
                        }}
                     >
                        <MenuItem onClick={props.onConfig}> Configuração</MenuItem>
                     </Menu>
                     <CustomButton
                        onClick={props.onClick}
                        title="Logout"
                        color="white"
                        sx={{ borderRadius: '17px' }}
                     />
                  </Box>
               </Box>
            </Box>
         </Drawer>
      </>
   );
};
export default CustomLoginDrawer;
