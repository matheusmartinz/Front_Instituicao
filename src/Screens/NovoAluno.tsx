import {
    Box,
    Button,
    Container,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlunoService from '../api/services/aluno.service';
import EscolaService from '../api/services/escola.service';
import UtilsService from '../api/services/utils.service';
import GenericSelect from '../components/GenericSelect';
import GenericTextField from '../components/GenericTextField';
import '../styles/NovoAluno.css';
import {
    AlunoDataGridDTO,
    AlunoDTO,
    Disciplina,
    GenericTO,
    TarefaDTO,
    UF,
} from '../types';

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
        serieAno: null as null | string,
        uuid: null as string | null,
    } as AlunoDTO,
    options: {
        serie: [] as Array<string>,
        escola: [] as Array<GenericTO>,
    },
    escola: '' as string,
    error: {
        nome: false,
        cpf: false,
        email: false,
        ddd: false,
        telefone: false,
        serie: false,
        cep: false,
        cidade: false,
        estado: false,
    },
};

const NovoAluno = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const location = useLocation();
    const alunoSelecionado = location.state as
        | AlunoDataGridDTO
        | undefined;
    const utilService = UtilsService();
    const escolaService = EscolaService();
    const aluService = AlunoService();
    const navigate = useNavigate();

    const getSeries = async () => {
        try {
            const { data } = await utilService.getSeries();

            setStateLocal((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    serie: data,
                },
            }));
        } catch (err) {
            if (Axios.isAxiosError(err)) {
                alert(err.message);
            }
        }
    };

    useEffect(() => {
        getSeries();
        getEscolas();
    }, []);

    useEffect(() => {
        getEscolas();
    }, [stateLocal.alunoDTO.serieAno]);

    const getEscolas = async () => {
        try {
            const { data } = await escolaService.listAllEscolas(
                stateLocal.alunoDTO.serieAno
            );
            if (data.length === 0) {
                return setStateLocal((prevState) => ({
                    ...prevState,
                    error: {
                        ...prevState.error,
                        serie: true,
                        escola: true,
                    },
                }));
            }

            setStateLocal((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    escola: data,
                },
            }));
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const updateAluno = async (alunoDTO: AlunoDTO) => {
        const nome: String = stateLocal.alunoDTO.nome;

        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
            },
        }));
    };

    const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                nome:
                    limpaNumero(event.target.value, 'Apenas Letras') ??
                    prevState.alunoDTO.nome,
            },
        }));
    };

    const onChangeTelefoneFone = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                telefone: {
                    ...prevState.alunoDTO.telefone,
                    fone: limpaLetras(event.target.value), // 'Apenas números', prevState.alunoDTO.telefone.fone
                },
            },
        }));
    };

    const onChangeDDD = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                telefone: {
                    ...prevState.alunoDTO.telefone,
                    ddd: limpaLetras(event.target.value), //  'Apenas Numero', prevState.alunoDTO.telefone.ddd
                },
            },
        }));
    };

    const limpaLetras = (valor: string): string => {
        return valor.replace(/\D/g, '');
    };

    const validaValor = (valor: string, mensagem: string) => {
        // if (isNaN(Number(valor))) {
        //     return alert(mensagem);
        // }
    };

    const limpaNumero = (valor: string, mensagem: string): string => {
        if (/^[0-9]+$/.test(valor)) {
            alert(mensagem);
            return '';
        }
        // Permite letras, espaços e acentos
        return valor.replace(/[^a-zA-ZÀ-ú\s]/g, '');
    };

    const onChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        validaValor(event.target.value, 'Apenas números');
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                cpf: limpaLetras(event.target.value), // 'Apenas números', prevState.alunoDTO.cpf
            },
            error: {
                ...prevState.error,
                cpf: false,
            },
        }));
    };

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                email: event.target.value,
            },
        }));
    };

    const onChangeCidade = (event: any) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                endereco: {
                    ...prevState.alunoDTO.endereco,
                    cidade: event.target.value,
                },
            },
        }));
    };

    const onChangeSerie = (event: SelectChangeEvent) => {
        setStateLocal((prevState) => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                serieAno: event.target.value,
            },
        }));
    };

    useEffect(() => {
        if (stateLocal.alunoDTO.endereco.cep.length === 8) {
            getCep(stateLocal.alunoDTO.endereco.cep);
        }
    }, [stateLocal.alunoDTO.endereco.cep]);

    const postAluno = async (alunoDTO: AlunoDTO, escolaUUID: string) => {
        try {
            const { data } = await aluService.postAluno(
                alunoDTO,
                escolaUUID
            );
            if (data) {
                return navigate('/aluno');
            }
        } catch (err) {
            console.log('err');
        }
    };

    const onNewAluno = () => {
        const nomeError = !stateLocal.alunoDTO.nome; // stateLocal.alunoDTO.nome.trim().split(/\s+/).length < 2;
        const cpfError = stateLocal.alunoDTO.cpf.length !== 11;
        // const email = stateLocal.alunoDTO.email.length === 0;
        // const ddd = stateLocal.alunoDTO.telefone.ddd.length < 2;
        // const telefone = stateLocal.alunoDTO.telefone.fone.length === 0;
        // const serie = stateLocal.alunoDTO.serieAno.length === 0;
        // const cep = stateLocal.alunoDTO.endereco.cep.length < 8;
        // const cidade = stateLocal.alunoDTO.endereco.cidade.length === 0;
        // const estado = !stateLocal.alunoDTO.endereco.estado;
        // const escolaSelecionada = !stateLocal.escola;

        console.log('nome', nomeError);

        const hasError = nomeError || cpfError;

        if (hasError) {
            return setStateLocal((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    nome: nomeError,
                    cpf: cpfError,
                    // email,
                    // ddd,
                    // telefone,
                    // serie,
                    // cep,
                    // cidade,
                    // estado,
                    // escolaSelecionada,
                },
            }));
        }
        return postAluno(stateLocal.alunoDTO, stateLocal.escola);
    };

    const getCep = async (cep: string) => {
        try {
            const { data } = await utilService.getCep(cep);
            if (data.erro) {
                return setStateLocal((prevState) => ({
                    ...prevState,
                    alunoDTO: {
                        ...prevState.alunoDTO,
                        endereco: {
                            ...prevState.alunoDTO.endereco,
                            cidade: initialState.alunoDTO.endereco.cidade,
                            estado: initialState.alunoDTO.endereco.estado,
                        },
                    },
                }));
            }
            setStateLocal((prevState) => ({
                ...prevState,
                alunoDTO: {
                    ...prevState.alunoDTO,
                    endereco: {
                        ...prevState.alunoDTO.endereco,
                        cidade: data.localidade,
                        estado: UF[data.uf as keyof typeof UF],
                    },
                },
            }));
        } catch (erro) {
            alert('TESTE');
        }
    };

    const onChangeAlunoCep = (event: any) => {
        const cep = event.target.value.slice(0, 8);
        setStateLocal((prevstate) => ({
            ...prevstate,
            alunoDTO: {
                ...prevstate.alunoDTO,
                endereco: {
                    ...prevstate.alunoDTO.endereco,
                    cep,
                },
            },
        }));
    };

    const onChangeEstado = (event: SelectChangeEvent) => {
        setStateLocal((prevState) => ({
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

    const onChangeEscola = (event: any) => {
        setStateLocal((prevState) => ({
            ...prevState,
            escola: event.target.value,
        }));
    };

    return (
        <Container sx={{ display: 'flex' }}>
            <Box
                sx={{
                    flexDirection: 'column',
                    display: 'flex',
                    margin: '5px',
                    marginTop: '20px',
                    width: '50%',
                    padding: '5px',
                    gap: '5px',
                }}
            >
                <GenericTextField
                    label="Nome Completo"
                    type="text"
                    value={stateLocal.alunoDTO.nome}
                    onChange={onChangeNome}
                    error={stateLocal.error.nome}
                    errorMessage="O Campo nome precisa possuir nome completo"
                />

                <GenericTextField
                    label="E-mail"
                    type="email"
                    value={stateLocal.alunoDTO.email}
                    onChange={onChangeEmail}
                    error={stateLocal.error.email}
                    errorMessage="O E-mail informado é inválido"
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <GenericTextField
                        label="CPF"
                        width="32%"
                        value={stateLocal.alunoDTO.cpf}
                        onChange={onChangeCpf}
                        error={stateLocal.error.cpf}
                        errorMessage="O CPF precisa possuir 11 números"
                    />

                    <GenericTextField
                        label="DDD"
                        width="32%"
                        value={stateLocal.alunoDTO.telefone.ddd}
                        onChange={onChangeDDD}
                        error={stateLocal.error.telefone}
                        errorMessage="DDD não informado"
                    />
                    <GenericTextField
                        label="Telefone"
                        width="32%"
                        value={stateLocal.alunoDTO.telefone.fone}
                        onChange={onChangeTelefoneFone}
                        error={stateLocal.error.telefone}
                        errorMessage="Telefone não informado"
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <GenericSelect
                        value={stateLocal.alunoDTO.serieAno}
                        onChange={onChangeSerie}
                        options={stateLocal.options.serie}
                        title="Série"
                    />
                    <GenericSelect
                        value={stateLocal.escola}
                        onChange={onChangeEscola}
                        options={stateLocal.options.escola}
                        title="Escola"
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <GenericTextField
                        value={stateLocal.alunoDTO.endereco.cep}
                        label="CEP"
                        width="32%"
                        onChange={onChangeAlunoCep}
                        error={stateLocal.error.cep}
                        errorMessage="CEP não informado"
                    />
                    <GenericTextField
                        value={stateLocal.alunoDTO.endereco.cidade}
                        label="Cidade"
                        width="32%"
                        onChange={onChangeCidade}
                        error={stateLocal.error.cidade}
                        errorMessage="Cidade não informada"
                    />
                    <GenericSelect
                        title="Estado"
                        value={stateLocal.alunoDTO.endereco.estado}
                        onChange={onChangeEstado}
                        options={stateLocal.options.escola}
                        width="32%"
                    />
                </Box>

                <Button
                    sx={{
                        padding: '25px',
                        bgcolor: 'purple',
                        marginTop: '10px',
                        color: 'white',
                    }}
                    onClick={onNewAluno}
                >
                    <Typography>ENVIAR</Typography>
                </Button>
            </Box>

            {/* <Box
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    width: '50%',
                }}
            >
                {JSON.stringify(stateLocal)}
            </Box> */}
        </Container>
    );
};
export default NovoAluno;
