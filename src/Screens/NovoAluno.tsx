import {
    Box,
    Button,
    Container,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlunoService from '../api/services/aluno.service';
import EscolaService from '../api/services/escola.service';
import UtilsService from '../api/services/utils.service';
import GenericSelect from '../components/GenericSelect';
import GenericTextField from '../components/GenericTextField';
import useCustomLocation from '../components/useCustomLocation';
import '../styles/NovoAluno.css';
import {
    AlunoDataGridDTO,
    AlunoDTO,
    Disciplina,
    GenericTO,
    TarefaDTO,
    UF,
} from '../types';
import { validateCPF } from '../utils/maskUtils';

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
        escola: false,
        uuid: false,
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
    const alunoService = AlunoService();
    const navigate = useNavigate();
    const { isTelaEditarAluno } = useCustomLocation();

    useEffect(() => {
        if (alunoSelecionado) {
            const cidadeEstado =
                alunoSelecionado.cidadeEstado.split(' - ');
            setStateLocal((prevState) => ({
                ...prevState,
                alunoDTO: {
                    ...prevState.alunoDTO,
                    uuid: alunoSelecionado.uuid,
                    nome: alunoSelecionado.nome,
                    email: alunoSelecionado.email,
                    cpf: alunoSelecionado.cpf,
                    telefone: {
                        ddd: alunoSelecionado.ddd,
                        fone: alunoSelecionado.fone,
                        pessoaUUID: null,
                    },
                    endereco: {
                        cep: alunoSelecionado.cep,
                        cidade:
                            cidadeEstado[0] ??
                            prevState.alunoDTO.endereco.cidade,
                        uuid: null,
                        estado:
                            UF[cidadeEstado[1] as keyof typeof UF] ??
                            prevState.alunoDTO.endereco.estado,
                    },
                },
                escola: alunoSelecionado.escola.uuid,
            }));
        }
    }, []);

    useEffect(() => {
        if (
            alunoSelecionado &&
            stateLocal.options.serie.includes(alunoSelecionado.serie)
        ) {
            setStateLocal((prevState) => ({
                ...prevState,
                alunoDTO: {
                    ...prevState.alunoDTO,
                    serieAno: alunoSelecionado.serie,
                },
            }));
        }
    }, [alunoSelecionado, stateLocal.options.serie]);

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
                    options: {
                        ...prevState.options,
                        escola: [],
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
        validateHasError();
        try {
            const { data } = await alunoService.updateAluno(alunoDTO);
            if (data) {
                navigate('/aluno');
            }
        } catch (err) {
            alert('Erro ao atualizar aluno');
        }
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
            error: {
                ...prevState.error,
                nome: false,
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
                    fone: limpaLetras(event.target.value),
                },
            },
            error: {
                ...prevState.error,
                telefone: false,
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
                    ddd: limpaLetras(event.target.value).slice(0, 2), //  'Apenas Numero', prevState.alunoDTO.telefone.ddd
                },
            },
            error: {
                ...prevState.error,
                ddd: false,
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
                cpf: limpaLetras(event.target.value).slice(0, 11), // 'Apenas números', prevState.alunoDTO.cpf
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
            error: {
                ...prevState.error,
                email: false,
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
            error: {
                ...prevState.error,
                serie: false,
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
            const { data } = await alunoService.postAluno(
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

    const validateNome = (nome: string): boolean => {
        const nomeParts = nome.trim().split(/\s+/);
        return (
            nomeParts.length < 2 ||
            nomeParts.some((parte) => parte.length < 4) ||
            !/^[A-Za-zÀ-ÖØ-öø-ÿ'´`^~\- ]+$/u.test(nome.trim())
        );
    };

    const validateEmail = (email: string): boolean => {
        if (!email.length) {
            errorMessage.current = 'Campo e-mail é obrigatorio';
            return true;
        }
        if (!email.includes('@')) {
            errorMessage.current = 'E-mail nao possui @';
            return true;
        }
        if (!email.includes('gmail')) {
            errorMessage.current =
                'Nosso cadastro só permite e-mails do GMAIL';
            return true;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return !emailRegex.test(email.trim());
    };

    const errorMessage = useRef('');
    const serieErrorMessage = useRef('');
    const escolaErrorMessage = useRef('');

    const formatCPF = (cpf: string): string => {
        const cleaned = cpf.replace(/\D/g, '').slice(0, 11); // Remove tudo que não é número
        return cleaned.replace(
            /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
            '$1.$2.$3-$4'
        );
    };

    const formatCEP = (cep: string): string => {
        const cleaned = cep.replace(/\D/g, '').slice(0, 8);
        if (cleaned.length <= 5) return cleaned;
        return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const validateSerie = (
        serie: string | null,
        escola: GenericTO[]
    ): boolean => {
        if (!serie || serie.trim() === '') {
            serieErrorMessage.current = 'Serie não foi informada';
            return true;
        }
        if (escola.length === 0) {
            serieErrorMessage.current = 'Série inválida';
            return true;
        }
        return false;
    };

    const validateEscola = (escola: GenericTO[]): boolean => {
        if (escola.length === 0) {
            escolaErrorMessage.current = 'Não há escola para esta série';
            return true;
        }
        return false;
    };

    const validateHasError = () => {
        const nomeError = validateNome(stateLocal.alunoDTO.nome);
        const cpfError = !validateCPF(stateLocal.alunoDTO.cpf);
        const emailError = validateEmail(stateLocal.alunoDTO.email);
        const dddError = stateLocal.alunoDTO.telefone.ddd.length !== 2;
        const telefoneError =
            stateLocal.alunoDTO.telefone.fone.length === 0;
        const serieError = validateSerie(
            stateLocal.alunoDTO.serieAno,
            stateLocal.options.escola
        );
        const cepError = stateLocal.alunoDTO.endereco.cep.length < 8;
        const cidadeError =
            stateLocal.alunoDTO.endereco.cidade.length === 0;
        const estadoError = !stateLocal.alunoDTO.endereco.estado;
        const escolaError = validateEscola(stateLocal.options.escola);
        const uuidError = !stateLocal.alunoDTO.uuid;
        const hasError =
            nomeError ||
            cpfError ||
            emailError ||
            telefoneError ||
            dddError ||
            cepError ||
            cidadeError ||
            escolaError ||
            serieError ||
            estadoError ||
            uuidError;

        if (hasError) {
            return setStateLocal((prevState) => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    nome: nomeError,
                    cpf: cpfError,
                    email: emailError,
                    ddd: dddError,
                    telefone: telefoneError,
                    escola: escolaError,
                    serie: serieError,
                    cep: cepError,
                    cidade: cidadeError,
                    estado: estadoError,
                    uuid: uuidError,
                },
            }));
        }
    };

    const onNewAluno = () => {
        validateHasError();
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
                    error: {
                        ...prevState.error,
                        cep: false,
                        cidade: false,
                        estado: false,
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
            console.log('triste');
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
                error: {
                    ...prevstate.error,
                    cep: false,
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
            error: {
                ...prevState.error,
                escola: false,
            },
        }));
    };

    return (
        <Container sx={{ display: 'flex' }}>
            <Typography>
                {!isTelaEditarAluno()
                    ? 'Cadastre um novo aluno'
                    : 'Altere o aluno'}
            </Typography>
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
                    errorMessage={errorMessage.current}
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
                        value={formatCPF(stateLocal.alunoDTO.cpf)}
                        onChange={onChangeCpf}
                        error={stateLocal.error.cpf}
                        errorMessage="O CPF precisa possuir 11 números"
                    />

                    <GenericTextField
                        label="DDD"
                        width="32%"
                        value={stateLocal.alunoDTO.telefone.ddd}
                        onChange={onChangeDDD}
                        error={stateLocal.error.ddd}
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
                    <GenericSelect<string>
                        value={stateLocal.alunoDTO.serieAno}
                        onChange={onChangeSerie}
                        options={stateLocal.options.serie}
                        error={stateLocal.error.serie}
                        errorMessage={serieErrorMessage.current}
                        title="Série"
                    />
                    <GenericSelect<GenericTO>
                        value={stateLocal.escola}
                        onChange={onChangeEscola}
                        error={stateLocal.error.escola}
                        options={stateLocal.options.escola}
                        title="Escola"
                        errorMessage={escolaErrorMessage.current}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <GenericTextField
                        value={formatCEP(stateLocal.alunoDTO.endereco.cep)}
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
                    <GenericSelect<UF>
                        title="Estado"
                        value={stateLocal.alunoDTO.endereco.estado}
                        onChange={onChangeEstado}
                        options={Object.values(UF)}
                        width="32%"
                        error={stateLocal.error.estado}
                        errorMessage="Estado não informado"
                    />
                </Box>

                <Button
                    sx={{
                        padding: '25px',
                        bgcolor: 'purple',
                        marginTop: '10px',
                        color: 'white',
                    }}
                    onClick={() => {
                        if (alunoSelecionado) {
                            updateAluno(stateLocal.alunoDTO);
                            return;
                        }
                        return onNewAluno;
                    }}
                >
                    <Typography>
                        {isTelaEditarAluno() ? 'Alterar' : 'Enviar'}
                    </Typography>
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
