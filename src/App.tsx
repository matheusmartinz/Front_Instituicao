import { AccountCircle } from '@mui/icons-material';
import Home from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import School from '@mui/icons-material/school';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import {
    Box,
    Button,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { JSX, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useCustomLocation from './components/useCustomLocation';

const initialState = {
    open: false as boolean,
};

export type TAppOption = {
    screen: string;
    icon: JSX.Element;
    route: string;
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

const App = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const navigate = useNavigate();
    const { isTelaEditarAluno } = useCustomLocation();

    const location = window.location;

    const onOpen = () => {
        setStateLocal((prevState) => ({ ...prevState, open: true }));
    };

    const onClose = () => {
        setStateLocal((prevState) => ({ ...prevState, open: false }));
    };

    const onNavigate = (route: string) => {
        onClose();
        setTimeout(() => {
            navigate(route);
        }, 500);

        // const path = tela === "Home" ? "/home" : `/${tela.toLowerCase()}`;
        // navigate(path);
        // setStateLocal(prevState => ({...prevState, open: false}))
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {options.map((option) => (
                    <ListItem key={option.screen} disablePadding>
                        <ListItemButton
                            onClick={() => onNavigate(option.route)}
                        >
                            <ListItemIcon></ListItemIcon>
                            {option.icon}
                            <ListItemText
                                primary={option.screen}
                                sx={{ marginLeft: '7px' }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const shouldRender = () => {
        if (isTelaEditarAluno()) {
            return <></>;
        }
        return (
            <div
                style={{
                    marginLeft: '-0.3rem',
                    borderRadius: '50%',
                    paddingTop: '10px',
                }}
            >
                <Button
                    onClick={onOpen}
                    sx={{
                        bgcolor: 'purple',
                        borderRadius: '50%',
                        height: '3rem',
                        width: '2rem',
                    }}
                >
                    <MenuIcon sx={{ color: 'white' }}></MenuIcon>
                </Button>
            </div>
        );
    };

    return (
        <Container
            sx={{
                width: '100vw',
                height: '100vh',
            }}
        >
            {shouldRender()}
            <Drawer open={stateLocal.open} onClose={onClose}>
                {DrawerList}
            </Drawer>
            <Outlet />
        </Container>
    );
};

export default App;
