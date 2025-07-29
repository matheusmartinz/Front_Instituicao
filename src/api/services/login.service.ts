import { AxiosResponse } from "axios";
import axios from "../axios";
import { LoginDTO } from './../../types';

const LoginService = () => {

    return {
        // createLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
        //     return axios.post('/login', loginDTO)
        // },
        createLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
            return axios.post('/login/cadastro', loginDTO);
        },
        autenticarLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
            return axios.post('/login/authentic', loginDTO)
        },
        updateLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
            return axios.put('/login/edit',loginDTO)
        }
    }
}
export default LoginService;