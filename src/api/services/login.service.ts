import { AxiosResponse } from "axios";
import axios from "../axios";
import { LoginDTO } from './../../types';

const LoginService = () => {

    return {
        // createLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
        //     return axios.post('/login', loginDTO)
        // },
        createLogin(formData: FormData): Promise<AxiosResponse<LoginDTO>>{
            return axios.post('/login', formData)
        },
        autenticarLogin(loginDTO: LoginDTO): Promise<AxiosResponse<LoginDTO>>{
            return axios.post('/login/authentic', loginDTO)
        }
    }
}
export default LoginService;