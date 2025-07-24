import { AxiosResponse } from "axios";
import { EscolaDataGridDTO, EscolaDTO, GenericTO } from "../../types";
import axios from "../axios";

const EscolaService = () => {
    const escola = "escola"

    return {
        createEscola(escolaDTO: EscolaDTO): Promise<AxiosResponse<EscolaDTO>> {
             return axios.post(`/${escola}`, escolaDTO);
        },
        findAll(): Promise<AxiosResponse<Array<EscolaDataGridDTO>>> {
            return axios.get(`/${escola}`,{
               
              })
        },
        deleteByUUID(uuid: string): Promise<AxiosResponse<void>>{
            return axios.delete(`/${escola}/${uuid}`);
        },
        updateByUUID(escolaDTO: EscolaDTO): Promise<AxiosResponse<EscolaDTO>> {
            return axios.put(`/${escola}`, escolaDTO)
        },
        listAllEscolas(serie: string = ""): Promise<AxiosResponse<Array<GenericTO>>> {
            return axios.get(`/${escola}/generics`,{params: {serie}});
        } 
    };
}
export default EscolaService;