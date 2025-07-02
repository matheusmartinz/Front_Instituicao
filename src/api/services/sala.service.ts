import { AxiosResponse } from "axios";
import { EscolaDTO, SalaDataGridDTO, SalaDTO } from "../../types";
import api from "../axios";


const SalaService = () => {

    return {
        getSalas(): Promise<AxiosResponse<Array<SalaDataGridDTO>>>{
            return api.get(`/sala`)
        },
        createSala(salaDTO: SalaDTO, escolaUUID: EscolaDTO): Promise<AxiosResponse<SalaDTO>>{
            return api.post(`/sala/${escolaUUID}`,salaDTO)
        }
    }
}

export default SalaService;