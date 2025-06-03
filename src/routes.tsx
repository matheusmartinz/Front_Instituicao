import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Aluno from './Screens/Aluno';
import Escola from './Screens/Escola';
import Home from './Screens/Home';
import NovaEscola from './Screens/NovaEscola';
import NovoAluno from './Screens/NovoAluno';
import Sala from './Screens/Sala';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: '/home', element: <Home /> },
            { path: '/escola', element: <Escola /> },
            { path: '/escola/nova', element: <NovaEscola key="nova" /> },
            {
                path: '/escola/editar',
                element: <NovaEscola key="editar" />,
            },
            { path: '/aluno', element: <Aluno /> },
            { path: '/aluno/novo', element: <NovoAluno key="nova" /> },
            { path: '/aluno/editar', element: <NovoAluno key="editar" /> },
            { path: '/sala', element: <Sala /> },
        ],
    },
]);
