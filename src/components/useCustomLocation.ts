import { useLocation } from "react-router-dom";

const useCustomLocation = () => {
    const location = useLocation()
    const pathName = location.pathname;

    return {
        isTelaEditarAluno: () => {
            return pathName === "/aluno/editar"
        },
        isTelaEditarEscola: () => {
            return pathName === "/escola/editar"
        },
        isTelaNovoAluno: () => {
            return pathName === "/aluno/novo"
        },
        isTelaNovaEscola: () => {
            return pathName === "/escola/nova"
        }
    }
}

export default useCustomLocation