import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Aluno from './Screens/Aluno';
import CadastroLogin from './Screens/CadastroLogin';
import Escola from './Screens/Escola';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Sala from './Screens/Sala';
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

            { path: '/aluno', element: <Aluno /> },
            { path: '/sala', element: <Sala /> },
            { path: '/spotify', element: <Spotify /> },
        ],
    },
]);
