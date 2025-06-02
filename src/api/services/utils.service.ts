import axios, { AxiosResponse } from "axios";
import { TCep } from "../../types";
import axiosDois from "../axios";

const UtilsService = () => {
    return {
        getCep(cep: string): Promise<AxiosResponse<TCep>> {
             return axios.get(`https://viacep.com.br/ws/${cep}/json`);
        },
        getSeries(): Promise<AxiosResponse<Array<string>>> {
            return axiosDois.get('/serie');
        }
    };
}

export default UtilsService;