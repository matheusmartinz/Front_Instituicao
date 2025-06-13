import { AxiosResponse } from "axios";
import { SalaDataGridDTO } from "../../types";
import api from "../axios";


const SalaService = () => {

    return {
        getSalas(): Promise<AxiosResponse<Array<SalaDataGridDTO>>>{
            return api.get(`/sala`)
        }
    }
}

export default SalaService;