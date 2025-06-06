import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Aluno from './Screens/Aluno';
import Escola from './Screens/Escola';
import Home from './Screens/Home';
import Sala from './Screens/Sala';
import Spotify from './Screens/Spotify';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: '/home', element: <Home /> },
            { path: '/escola', element: <Escola /> },

            { path: '/aluno', element: <Aluno /> },
            { path: '/sala', element: <Sala /> },
            { path: '/spotify', element: <Spotify /> },
        ],
    },
]);
