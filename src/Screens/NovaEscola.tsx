import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EscolaService from '../api/services/escola.service';
import UtilsService from '../api/services/utils.service';
import CustomButton from '../components/CustomButton';
import CustomDrawer from '../components/CustomDrawer';
import CustomTextField from '../components/CustomTextField';
import { EscolaDataGridDTO, EscolaDTO, UF } from '../types';

const initialState = {
    escolaDTO: {
        nome: '' as string,
        endereco: {
            cep: '' as string,
            cidade: '' as string,
            estado: '' as UF,
        },
        uuid: null as string | null,
    } as EscolaDTO,
    error: {
        nome: false,
        cep: false,
        cidade: false,
        estado: false,
    },
};

export type TNovaEscola = {
    onGoBack: () => void;
    escolaSelectionada: EscolaDataGridDTO | null;
};

const NovaEscola = (props: TNovaEscola) => {
    const navigate = useNavigate();
    const [stateLocal, setStateLocal] = useState(initialState);
    const location = useLocation();
    const escolaSelecionada = location.state as EscolaDataGridDTO;
    const utilService = UtilsService();
    const escolaService = EscolaService();

    useEffect(() => {
        if (
            stateLocal.escolaDTO.endereco.cep &&
            stateLocal.escolaDTO.endereco.cep.length === 8
        ) {
            findDadosPorCep(stateLocal.escolaDTO.endereco.cep);
        }
    }, [stateLocal.escolaDTO.endereco.cep]);

    const findDadosPorCep = async (cep: string) => {
        try {
            const { data } = await utilService.getCep(cep);
            if (data.erro) {
                return setStateLocal((prevState) => ({
                    ...prevState,
                    error: {
                        ...prevState.error,
                        cep: true,
                    },
                    escolaDTO: {
                        ...prevState.escolaDTO,
                        endereco: {
                            ...prevState.escolaDTO.endereco,
                            cidade: initialState.escolaDTO.endereco.cidade,
                            estado: initialState.escolaDTO.endereco.estado,
                        },
                    },
                }));
            }
            setStateLocal((prevState) => ({
                ...prevState,
                escolaDTO: {
                    ...prevState.escolaDTO,
                    endereco: {
                        ...prevState.escolaDTO.endereco,
                        cidade: data.logradouro,
                        estado: UF[data.uf as keyof typeof UF],
                    },
                },
            }));
        } catch {
            [];
        }
    };

    useEffect(() => {
        if (escolaSelecionada) {
            setStateLocal((prevState) => ({
                ...prevState,
                escolaDTO: {
                    ...prevState.escolaDTO,
                    nome: escolaSelecionada.nome,
                    endereco: {
                        ...prevState.escolaDTO.endereco,
                        cep: escolaSelecionada.cep,
                        estado: UF[
                            escolaSelecionada.estado as keyof typeof UF
                        ],
                        cidade: escolaSelecionada.cidade,
                    },
                    uuid: escolaSelecionada.uuid,
                },
            }));
        }
    }, []);

    const onChangeEscolaNome = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const valor = event.target.value.replace(/\s{2,}/g, ' '); // substitui 2+ espaços por 1 espaço

        setStateLocal((prevState) => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                nome: valor,
            },
            error: {
                ...prevState.error,
                nome: false,
            },
        }));
    };

    const formatCep = (cep: string) => {
        const digits = cep.replace(/\D/g, '');
        if (digits.length <= 5) return digits; // não formata se menor ou igual a 5 dígitos
        return digits.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
    };

    const onChangeEscolaCep = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        if (value.length > 8) {
            value = value.slice(0, 8);
        }

        setStateLocal((prevState) => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                endereco: {
                    ...prevState.escolaDTO.endereco,
                    cep: value,
                },
            },
            error: {
                ...prevState.error,
                cep: false,
            },
        }));
    };

    const onChangeEscolaCidade = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStateLocal((prevState) => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                endereco: {
                    ...prevState.escolaDTO.endereco,
                    cidade: event.target.value,
                },
            },
        }));
    };

    const onChangeEscolaEstado = (uf: UF) => {
        setStateLocal((prevState) => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                endereco: {
                    ...prevState.escolaDTO.endereco,
                    estado: uf,
                },
            },
        }));
    };

    const postEscola = async (escolaDTO: EscolaDTO) => {
        try {
            const { data } = await escolaService.createEscola(escolaDTO);
            if (data) {
                return navigate('/escola');
            }
        } catch (err) {
            if (Axios.isAxiosError(err)) {
                alert(err.response?.data.message);
            }
        }
    };

    const onCriarEscola = () => {
        const nome =
            stateLocal.escolaDTO.nome.trim().split(/\s+/).length < 2;
        const cep = stateLocal.escolaDTO.endereco.cep.length < 8;
        const cidade = stateLocal.escolaDTO.endereco.cidade.length === 0;
        const estado = !stateLocal.escolaDTO.endereco.estado;

        const hasError = nome || cep || cidade || estado;

        setStateLocal((prevState) => ({
            ...prevState,
            error: {
                ...prevState.error,
                nome,
                cep,
                cidade,
                estado,
            },
        }));
        if (!hasError) {
            postEscola(stateLocal.escolaDTO);
        }
        // postEscola();
    };

    const updateEscola = async (escolaDTO: EscolaDTO) => {
        const nome: boolean =
            stateLocal.escolaDTO.nome.trim().split(/\s+/).length < 2;
        const cep: boolean = stateLocal.escolaDTO.endereco.cep.length < 8;
        const cidade: boolean =
            stateLocal.escolaDTO.endereco.cidade.length === 0;
        const estado: boolean = !stateLocal.escolaDTO.endereco.estado;
        const uuid: boolean = !stateLocal.escolaDTO.uuid;

        const hasError = nome || cep || cidade || estado || uuid;

        setStateLocal((prevState) => ({
            ...prevState,
            error: {
                ...prevState.error,
                nome,
                cep,
                cidade,
                estado,
                uuid,
            },
        }));
        if (!hasError) {
            try {
                const { data } = await escolaService.updateByUUID(
                    escolaDTO
                );
                if (data) {
                    navigate('/escola');
                }
            } catch {
                alert('Erro ao atualizar a escola');
            }
        }
    };

    const buttonFinalizarOperacao = () => {
        if (escolaSelecionada) {
            return updateEscola(stateLocal.escolaDTO);
        }
        return onCriarEscola();
    };

    return (
        <>
            <CustomDrawer title="Voltar" onGoBack={props.onGoBack} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '300px',
                    paddingY: '20px',
                    border: '1px solid black',
                    marginLeft: '15%',
                }}
            >
                <CustomTextField
                    value={stateLocal.escolaDTO.nome}
                    onChange={onChangeEscolaNome}
                    label="Insira o nome da escola"
                    error={stateLocal.error.nome}
                    errorMessage="Inserir o nome completo"
                />
                {/* <FormControl>
                    <TextField
                        value={stateLocal.escolaDTO.nome}
                        onChange={onChangeEscolaNome}
                        label="Insira o nome da escola"
                        sx={{
                            marginTop: '20px',
                        }}
                        error={stateLocal.error.nome}
                        helperText={
                            stateLocal.error.nome
                                ? 'Informe o nome completo seu Animal'
                                : ''
                        }
                        required
                    />
                </FormControl> */}

                <FormControl>
                    <TextField
                        value={formatCep(
                            stateLocal.escolaDTO.endereco.cep
                        )}
                        onChange={onChangeEscolaCep}
                        label="Insira seu cep"
                        sx={{
                            marginTop: '20px',
                        }}
                        type="text"
                        error={stateLocal.error.cep}
                        helperText={
                            stateLocal.error.cep
                                ? 'Informe o CEP seu Animal'
                                : ''
                        }
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        value={stateLocal.escolaDTO.endereco.cidade}
                        onChange={onChangeEscolaCidade}
                        label="Insira sua cidade"
                        sx={{
                            marginTop: '20px',
                        }}
                        type="text"
                        error={stateLocal.error.cidade}
                        helperText={
                            stateLocal.error.cidade
                                ? 'Informe a cidade seu Animal'
                                : ''
                        }
                        required
                    />
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{ marginTop: '20px' }}
                    error={stateLocal.error.estado}
                >
                    <InputLabel id="demo-simple-select-label">
                        Estado
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stateLocal.escolaDTO.endereco.estado}
                        label="Estado"
                    >
                        {Object.values(UF).map((uf) => {
                            return (
                                <MenuItem
                                    value={uf}
                                    onClick={() =>
                                        onChangeEscolaEstado(uf)
                                    }
                                >
                                    {uf}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {stateLocal.error.estado && (
                        <FormHelperText>
                            Por favor, selecione um estado válido
                        </FormHelperText>
                    )}
                </FormControl>

                <CustomButton
                    title={
                        !props.escolaSelectionada ? 'Enviar' : 'Alterar'
                    }
                    onClick={buttonFinalizarOperacao}
                    sx={{
                        bgcolor: 'purple',
                        marginTop: '20px',
                        padding: '20px',
                        width: '60%',
                        justifyContent: 'center',
                        marginLeft: '50px',
                        marginY: '25px',
                    }}
                />
            </Box>
        </>
    );
};

export default NovaEscola;
