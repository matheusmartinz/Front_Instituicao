import { Login } from '@mui/icons-material';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Aluno from './Screens/Aluno/Aluno';
import Escola from './Screens/Escola/Escola';
import NovaEscola from './Screens/Escola/NovaEscola';
import Home from './Screens/Home';
import CadastroLogin from './Screens/Login/CadastroLogin';
import Perfil from './Screens/Login/Perfil';
import NovaSala from './Screens/Sala/NovaSala';
import Sala from './Screens/Sala/Sala';
import Spotify from './Screens/Spotify';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/login" replace /> },
            { path: '/cadastro', element: <CadastroLogin /> },
            { path: '/login', element: <Login /> },
            { path: '/home', element: <Home /> },
            { path: '/escola', element: <Escola /> },
            //  { path: '/escola/cadastro', element: <NovaEscola /> },
            { path: '/aluno', element: <Aluno /> },
            { path: '/novaescola', element: <NovaEscola /> },
            { path: '/sala', element: <Sala /> },
            { path: '/sala/cadastro', element: <NovaSala /> },
            { path: '/perfil', element: <Perfil /> },
            { path: '/spotify', element: <Spotify /> },
        ],
    },
]);
