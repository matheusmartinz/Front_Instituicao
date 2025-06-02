import { AxiosResponse } from "axios";
import axios from "../axios";
import { AlunoDataGridDTO, AlunoDTO } from './../../types';


const AlunoService = () => {
    const aluno = 'aluno'

    return {
        findAll(): Promise<AxiosResponse<Array<AlunoDataGridDTO>>> {
            return axios.get(`${aluno}`);
        },
        updateAluno(alunoDTO: AlunoDTO): Promise<AxiosResponse<AlunoDTO>> {
            return axios.put(`${aluno}`,alunoDTO);
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