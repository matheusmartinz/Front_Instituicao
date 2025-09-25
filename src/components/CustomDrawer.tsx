import { AccountCircle, Home, School } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import {
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';

export type TAppOption = {
   screen: string;
   icon: JSX.Element;
   route: string;
};

const initialState = {
   open: false as boolean,
};

export type TCustomDrawerProps = {
   title?: string;
   onGoBack?: () => void;
   hiddenRoutes?: string[];
};

const CustomDrawer = (props: TCustomDrawerProps) => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const navigate = useNavigate();

   const onOpen = () => {
      setStateLocal(prevState => ({ ...prevState, open: true }));
   };

   const onClose = () => {
      setStateLocal(prevState => ({ ...prevState, open: false }));
   };

   const options: Array<TAppOption> = [
      {
         screen: 'Home',
         icon: <Home />,
         route: '/home',
      },
      {
         screen: 'Escola',
         icon: <School />,
         route: '/escola',
      },
      {
         screen: 'Aluno',
         icon: <AccountCircle />,
         route: '/aluno',
      },
      {
         screen: 'Sala',
         icon: <SensorDoorIcon />,
         route: '/sala',
      },
   ];

   const onNavigate = (route: string) => {
      onClose();
      setTimeout(() => {
         navigate(route);
      }, 500);
   };

   const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation">
         <List>
            {options
               .filter(option => !props.hiddenRoutes?.includes(option.route))
               .map(option => (
                  <ListItem key={option.screen} disablePadding>
                     <ListItemButton onClick={() => onNavigate(option.route)}>
                        <ListItemIcon></ListItemIcon>
                        {option.icon}
                        <ListItemText primary={option.screen} sx={{ marginLeft: '7px' }} />
                     </ListItemButton>
                  </ListItem>
               ))}
         </List>
      </Box>
   );

   return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
         <Button
            onClick={onOpen}
            sx={{
               bgcolor: 'purple',
               height: '3rem',
               width: '2rem',
            }}
         >
            <MenuIcon sx={{ color: 'white' }} />
         </Button>
         {!!props.title && !!props.onGoBack && (
            <CustomButton
               title={props.title}
               onClick={props.onGoBack}
               sx={{
                  bgcolor: 'purple',
                  paddingY: '12px',
                  marginLeft: '8px',
               }}
            />
         )}
         <Drawer open={stateLocal.open} onClose={onClose}>
            {DrawerList}
         </Drawer>
      </Box>
   );
};

export default CustomDrawer;
