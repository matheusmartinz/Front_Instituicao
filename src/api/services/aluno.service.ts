import { AxiosResponse } from "axios"
import { AlunoDataGridDTO, AlunoDTO } from "../../types"
import axios from "../axios"


const AlunoService = () => {
    const aluno = 'aluno'

    return {
        findAll(): Promise<AxiosResponse<Array<AlunoDataGridDTO>>> {
            return axios.get(`${aluno}`);
        },
        updateAluno(): Promise<AxiosResponse<Array<AlunoDataGridDTO>>> {
            return axios.put(`${aluno}`);
        },
        deleteAlunoByUuid(uuid: string): Promise<AxiosResponse<void>> {
            return axios.delete(`${aluno}/${uuid}`);
        },
        postAluno(alunodto: AlunoDTO, escolaUuid: string): Promise<AxiosResponse<AlunoDTO>> {
            return axios.post(`${aluno}/${escolaUuid}`,alunodto)
        }
    }
}

export default AlunoService;