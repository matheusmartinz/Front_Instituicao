import { Box, Container, SelectChangeEvent } from '@mui/material';
import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AlunoService from '../api/services/aluno.service';
import EscolaService from '../api/services/escola.service';
import UtilsService from '../api/services/utils.service';
import CustomButton from '../components/CustomButton';
import CustomDrawer from '../components/CustomDrawer';
import CustomSelect from '../components/CustomSelect';
import CustomTextField from '../components/CustomTextField';
import '../styles/NovoAluno.css';
import { AlunoDataGridDTO, AlunoDTO, Disciplina, GenericTO, TarefaDTO, TipoTelaAluno, UF } from '../types';
import { validateCPF } from '../utils/maskUtils';
import Aluno from './Aluno';

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
    tipoTela: TipoTelaAluno.CADASTRO,
};

export type TNovoAlunoProps = {
    onGoBack: () => void;
    alunoSelecionado: AlunoDataGridDTO | null;
};

const NovoAluno = (props: TNovoAlunoProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const utilService = UtilsService();
    const escolaService = EscolaService();
    const alunoService = AlunoService();
    const alunoSelecionado = props.alunoSelecionado;

    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        if (alunoSelecionado) {
            const cidadeEstado = alunoSelecionado.cidadeEstado.split(' - ');
            setStateLocal(prevState => ({
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
                    serieAno: alunoSelecionado.serie,
                    endereco: {
                        cep: alunoSelecionado.cep,
                        cidade: cidadeEstado[0] ?? prevState.alunoDTO.endereco.cidade,
                        uuid: null,
                        estado: UF[cidadeEstado[1] as keyof typeof UF] ?? prevState.alunoDTO.endereco.estado,
                    },
                },
                escola: alunoSelecionado.escolaUUID,
            }));
        }
        //eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     if (
    //         alunoSelecionado &&
    //         stateLocal.options.serie.includes(alunoSelecionado.serie)
    //     ) {
    //         setStateLocal((prevState) => ({
    //             ...prevState,
    //             alunoDTO: {
    //                 ...prevState.alunoDTO,
    //                 serieAno: alunoSelecionado.serie,
    //             },
    //         }));
    //     }
    // }, [alunoSelecionado, stateLocal.options.serie]);

    const getSeries = async () => {
        try {
            const { data } = await utilService.getSeries();

            setStateLocal(prevState => ({
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
        if (isFirstRender.current) {
            getSeries();
            getEscolas();
        }
        isFirstRender.current = false;
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!!stateLocal.alunoDTO.serieAno) {
            getEscolas();
        }
        //eslint-disable-next-line
    }, [stateLocal.alunoDTO.serieAno]);

    const getEscolas = async () => {
        try {
            const { data } = await escolaService.listAllEscolas(stateLocal.alunoDTO.serieAno);
            if (data.length === 0) {
                return setStateLocal(prevState => ({
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

            setStateLocal(prevState => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    escola: data,
                },
            }));
        } catch (err: unknown) {
            alert(err);
        }
    };

    const updateAluno = async (alunoDTO: AlunoDTO) => {
        validateHasError();
        try {
            const { data } = await alunoService.updateAluno(alunoDTO);
            if (data) {
                return setStateLocal(prevState => ({
                    ...prevState,
                    tipoTela: TipoTelaAluno.LISTAGEM,
                }));
            }
        } catch {
            alert('Erro ao atualizar aluno');
        }
    };

    const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            alunoDTO: {
                ...prevState.alunoDTO,
                nome: limpaNumero(event.target.value, 'Apenas Letras') ?? prevState.alunoDTO.nome,
            },
            error: {
                ...prevState.error,
                nome: false,
            },
        }));
    };

    const onChangeTelefoneFone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
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
        setStateLocal(prevState => ({
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
        if (isNaN(Number(valor))) {
            return alert(mensagem);
        }
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
        setStateLocal(prevState => ({
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
        setStateLocal(prevState => ({
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
        setStateLocal(prevState => ({
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
        setStateLocal(prevState => ({
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
        //eslint-disable-next-line
    }, [stateLocal.alunoDTO.endereco.cep]);

    const validateNome = (nome: string): boolean => {
        const nomeParts = nome.trim().split(/\s+/);
        return (
            nomeParts.length < 2 ||
            nomeParts.some(parte => parte.length < 4) ||
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
            errorMessage.current = 'Nosso cadastro só permite e-mails do GMAIL';
            return true;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return !emailRegex.test(email.trim());
    };

    const errorMessage = useRef('');
    const serieErrorMessage = useRef('');
    const escolaErrorMessage = useRef('');

    const formatCPF = (cpf: string): string => {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length !== 11) return cleaned;
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatCEP = (cep: string): string => {
        const cleaned = cep.replace(/\D/g, '').slice(0, 8);
        if (cleaned.length <= 5) return cleaned;
        return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const validateSerie = (serie: string | null, escola: GenericTO[]): boolean => {
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
        const telefoneError = stateLocal.alunoDTO.telefone.fone.length === 0;
        const serieError = validateSerie(stateLocal.alunoDTO.serieAno, stateLocal.options.escola);
        const cepError = stateLocal.alunoDTO.endereco.cep.length < 8;
        const cidadeError = stateLocal.alunoDTO.endereco.cidade.length === 0;
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
            return setStateLocal(prevState => ({
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

    const onPostAluno = useCallback(
        async (aluno: AlunoDTO, escola: string) => {
            try {
                const { data } = await alunoService.postAluno(aluno, escola);
                if (data) return onNavigateListagem();
            } catch {
                console.log('err');
            }
        }, //eslint-disable-next-line
        [],
    );

    const getCep = async (cep: string) => {
        try {
            const { data } = await utilService.getCep(cep);
            if (data.erro) {
                return setStateLocal(prevState => ({
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
            setStateLocal(prevState => ({
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
            console.log(erro);
        }
    };

    const onChangeAlunoCep = (event: any) => {
        const cep = event.target.value.slice(0, 8);
        setStateLocal(prevstate => ({
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

    const onChangeEscola = (event: any) => {
        setStateLocal(prevState => ({
            ...prevState,
            escola: event.target.value,
            error: {
                ...prevState.error,
                escola: false,
            },
        }));
    };

    const OnClickFinalizar = () => {
        if (props.alunoSelecionado) {
            return updateAluno(stateLocal.alunoDTO);
        }
        validateHasError();
        return onPostAluno(stateLocal.alunoDTO, stateLocal.escola);
    };

    const onNavigateListagem = useCallback(() => {
        setStateLocal(prevState => ({
            ...prevState,
            tipoTela: TipoTelaAluno.LISTAGEM,
        }));
    }, []);

    return (
        <>
            {stateLocal.tipoTela === TipoTelaAluno.CADASTRO && (
                <>
                    <CustomDrawer title="Voltar para o Aluno" onGoBack={props.onGoBack} />
                    <Container
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <Box
                            sx={{
                                flexDirection: 'column',
                                display: 'flex',
                                margin: '5px',
                                marginTop: '35px',
                                width: '50%',
                                padding: '10px',
                                gap: '5px',
                                border: '1px solid gray',
                                marginLeft: '20%',
                                borderRadius: '5px',
                            }}
                        >
                            <CustomTextField
                                label="Nome Completo"
                                type="text"
                                value={stateLocal.alunoDTO.nome}
                                onChange={onChangeNome}
                                error={stateLocal.error.nome}
                                errorMessage="O Campo nome precisa possuir nome completo"
                                variant="standard"
                            />

                            <CustomTextField
                                label="E-mail"
                                type="email"
                                value={stateLocal.alunoDTO.email}
                                onChange={onChangeEmail}
                                error={stateLocal.error.email}
                                errorMessage={errorMessage.current}
                                variant="standard"
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomTextField
                                    label="CPF"
                                    width="32%"
                                    value={formatCPF(stateLocal.alunoDTO.cpf)}
                                    onChange={onChangeCpf}
                                    error={stateLocal.error.cpf}
                                    errorMessage="O CPF precisa possuir 11 números"
                                    variant="standard"
                                    required={true}
                                />

                                <CustomTextField
                                    label="DDD"
                                    width="32%"
                                    value={stateLocal.alunoDTO.telefone.ddd}
                                    onChange={onChangeDDD}
                                    error={stateLocal.error.ddd}
                                    errorMessage="DDD não informado"
                                    variant="standard"
                                />
                                <CustomTextField
                                    label="Telefone"
                                    width="32%"
                                    value={stateLocal.alunoDTO.telefone.fone}
                                    onChange={onChangeTelefoneFone}
                                    error={stateLocal.error.telefone}
                                    errorMessage="Telefone não informado"
                                    variant="standard"
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomSelect<string>
                                    value={stateLocal.alunoDTO.serieAno}
                                    onChange={onChangeSerie}
                                    options={stateLocal.options.serie}
                                    error={stateLocal.error.serie}
                                    errorMessage={serieErrorMessage.current}
                                    title="Série"
                                    required
                                    variant="standard"
                                />
                                <CustomSelect<GenericTO>
                                    value={stateLocal.escola}
                                    onChange={onChangeEscola}
                                    error={stateLocal.error.escola}
                                    options={stateLocal.options.escola}
                                    title="Escola"
                                    errorMessage={escolaErrorMessage.current}
                                    variant="standard"
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomTextField
                                    value={formatCEP(stateLocal.alunoDTO.endereco.cep)}
                                    label="CEP"
                                    width="32%"
                                    onChange={onChangeAlunoCep}
                                    error={stateLocal.error.cep}
                                    errorMessage="CEP não informado"
                                    variant="standard"
                                />
                                <CustomTextField
                                    value={stateLocal.alunoDTO.endereco.cidade}
                                    label="Cidade"
                                    width="32%"
                                    onChange={onChangeCidade}
                                    error={stateLocal.error.cidade}
                                    errorMessage="Cidade não informada"
                                    variant="standard"
                                />
                                <CustomSelect<UF>
                                    title="Estado"
                                    value={stateLocal.alunoDTO.endereco.estado}
                                    onChange={onChangeEstado}
                                    options={Object.values(UF)}
                                    width="32%"
                                    error={stateLocal.error.estado}
                                    errorMessage="Estado não informado"
                                    required
                                    variant="standard"
                                />
                            </Box>
                            <CustomButton
                                onClick={OnClickFinalizar}
                                sx={{
                                    padding: '25px',
                                    bgcolor: 'purple',
                                    marginTop: '25px',
                                    color: 'white',
                                    width: '50%',
                                    justifyContent: 'center',
                                    marginLeft: '23%',
                                }}
                                title={!props.alunoSelecionado ? 'Enviar' : 'Alterar'}
                            />
                        </Box>
                    </Container>
                </>
            )}
            {stateLocal.tipoTela !== TipoTelaAluno.CADASTRO && <Aluno />}
        </>
    );
};
export default NovoAluno;
