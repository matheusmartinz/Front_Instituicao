import { useLocation } from "react-router-dom";

const useCustomLocation = () => {
    const location = useLocation()
    const pathName = location.pathname;

    console.log(pathName)

    return {
        isTelaEditarAluno: () => {
            return pathName === "/aluno/editar"
        },
        isTelaEditarEscola: () => {
            return pathName === "/escola/editar"
        }
    }
}

export default useCustomLocation