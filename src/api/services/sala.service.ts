import { Axios, AxiosResponse } from "axios";
import { SalaDataGridDTO, SalaDTO } from "../../types";
import api from "../axios";


const SalaService = () => {

    return {
        getSalas(): Promise<AxiosResponse<Array<SalaDataGridDTO>>>{
            return api.get(`/sala`)
        },
        createSala(salaDTO: SalaDTO, escolaUUID: string): Promise<AxiosResponse<SalaDTO>>{
            return api.post(`/sala/${escolaUUID}`,salaDTO)
        },
        updateSala(salaDTO: SalaDTO, salaUUID: string): Promise<AxiosResponse<SalaDTO>>{
            return api.put(`/sala/${salaUUID}`, salaDTO)
        },
        deleteSala(salaUUID: string): Promise<AxiosResponse<void>>{
            return api.delete(`/sala/${salaUUID}`)
        }
    }
}

export default SalaService;