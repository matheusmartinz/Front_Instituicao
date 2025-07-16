import { AxiosResponse } from "axios";
import { SalaDataGridDTO, SalaDTO } from "../../types";
import api from "../axios";


const SalaService = () => {

    return {
        getSalas(): Promise<AxiosResponse<Array<SalaDataGridDTO>>>{
            return api.get(`/sala`)
        },
        createSala(salaDTO: SalaDTO, escolaUUID: string): Promise<AxiosResponse<SalaDTO>>{
            return api.post(`/sala/${escolaUUID}`,salaDTO)
        }
    }
}

export default SalaService;