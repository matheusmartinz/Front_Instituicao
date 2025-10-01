import { Box, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import ImagemEditAluno from '../../assets/images/formdialog_edit_aluno.svg';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextField from '../../components/CustomTextField';
import { AlunoDataGridDTO, AlunoDTO, Disciplina, GenericTO, SerieAno, TarefaDTO, UF } from '../../types';
import EscolaService from 'api/services/escola.service';

export type TFormDialogAlunoProps = {
    onCloseDialog: () => void;
    alunoSelecionado: null | AlunoDataGridDTO;
};

const initialState = {
    alunoDTO: {
        nome: '' as string,
        cpf: '' as string,
        email: '' as string,
        telefone: {
            ddd: '' as string,
            fone: '' as string,
        },
        endereco: {
            cidade: '' as string,
            cep: '' as string,
            estado: '' as UF,
        },
        matricula: '' as string,
        tarefas: [] as Array<TarefaDTO>,
        disciplinas: [] as Array<Disciplina>,
        serieAno: '' as string,
        uuid: null as string | null,
    } as AlunoDTO,
    options: {
        serie: [] as Array<string>,
        escola: [] as Array<GenericTO>,
    },
    escola: '' as string,
};

const FormDialogAluno = (props: TFormDialogAlunoProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const escolaService = EscolaService()
    const cidadeEstado = props.alunoSelecionado?.cidadeEstado.split(' - ');
    
    const onChangeEstado = (event: SelectChangeEvent) => {
        setStateLocal(prevState => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                endereco: {
                    ...prevState.alunoDTO.endereco,
                    estado: UF[event.target.value as keyof typeof UF],
                },
            },
        }));
    };
    
    const getEscolas = async () => {
        const {data} = await escolaService.listAllEscolas(stateLocal.alunoDTO.serieAno)

        if (data){
            return setStateLocal((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    escola: data
                }
            }))
        }
    }

    useEffect(() => {
        getEscolas()
    },[stateLocal.alunoDTO.serieAno])

    const onChangeSerieAno = (event: SelectChangeEvent) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                serieAno: event.target.value
            }
        }))
    }

    const onChangeEscola = (event: SelectChangeEvent) => {
        setStateLocal((prevState) => ({
            ...prevState,
                escola: event.target.value
        }))
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2, gap: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        padding: '20px',
                        border: '1px solid gray',
                        borderRadius: '8px',
                        gap: '10px',
                    }}
                >
                    <CustomTextField
                        label="Nome da Escola"
                        type="text"
                        value={props.alunoSelecionado?.nome}
                        onChange={() => {}}
                        error={false}
                        errorMessage=""
                        variant="standard"
                    />

                    <CustomTextField
                        label="CPF"
                        type="text"
                        value={props.alunoSelecionado?.cpf}
                        onChange={() => {}}
                        error={false}
                        errorMessage=""
                        variant="standard"
                    />

                    <CustomTextField
                        label="E-mail"
                        type="email"
                        value={props.alunoSelecionado?.email}
                        onChange={() => {}}
                        error={false}
                        errorMessage=""
                        variant="standard"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <CustomTextField
                            label="DDD"
                            type="number"
                            value={props.alunoSelecionado?.ddd}
                            onChange={() => {}}
                            error={false}
                            errorMessage=""
                            variant="standard"
                            sx={{ width: '10%' }}
                        />

                        <CustomTextField
                            label="Telefone"
                            type="number"
                            value={props.alunoSelecionado?.fone}
                            onChange={() => {}}
                            error={false}
                            errorMessage=""
                            variant="standard"
                            sx={{ width: '90%' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <CustomTextField
                            label="CEP"
                            width="32%"
                            value={props.alunoSelecionado?.cep}
                            onChange={() => {}}
                            error={false}
                            errorMessage=""
                            variant="standard"
                        />
                        <CustomTextField
                            label="Cidade"
                            width="32%"
                            value={props.alunoSelecionado?.cidadeEstado}
                            onChange={() => {}}
                            error={false}
                            errorMessage=""
                            variant="standard"
                        />
                        <CustomSelect<UF>
                            title="Estado"
                            value=""
                            onChange={onChangeEstado}
                            options={Object.values(UF)}
                            width="32%"
                            error={false}
                            errorMessage=""
                            required
                            variant="standard"
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <CustomSelect<string>
                            title= 'Série Ano'
                            value={props.alunoSelecionado?.serie}
                            onChange={onChangeSerieAno}
                            options={Object.values(SerieAno)}
                            error={false}
                            errorMessage={''}
                            variant="standard"
                        />

                        <CustomSelect<GenericTO>
                            title={''}
                            value={props.alunoSelecionado?.escolaDescricao}
                            onChange={onChangeEscola}
                            options={stateLocal.options.escola}
                            error={false}
                            errorMessage={''}
                            variant="standard"
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            marginTop: '25px',
                        }}
                    >
                        <CustomButton
                            onClick={props.onCloseDialog}
                            sx={{
                                bgcolor: 'gray',
                                color: 'white',
                                width: '35%',
                                borderRadius: '20px',
                            }}
                            title="Cancelar"
                        />

                        <CustomButton
                            onClick={() => {}}
                            sx={{
                                padding: '12px',
                                bgcolor: 'purple',
                                color: 'white',
                                width: '35%',
                                borderRadius: '20px',
                            }}
                            title="Editar Aluno"
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', width: '50%', marginTop: '15%' }}>
                    <img
                        src={ImagemEditAluno}
                        alt="Editar escola"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                        draggable={false}
                    />
                </Box>
            </Box>
        </>
    );
};

export default FormDialogAluno;
