import { Box, SelectChangeEvent } from '@mui/material';
import SalaService from 'api/services/sala.service';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import EscolaService from '../../api/services/escola.service';
import ImagemEditEscola from '../../assets/images/undraw_design_ewba.svg';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextField from '../../components/CustomTextField';
import { GenericTO, SalaDataGridDTO, SalaDTO, SerieAno } from '../../types';

export type TPropsFormDialogEscola = {
    onCloseDialog: () => void;
    salaSelecionada: SalaDataGridDTO | null;
    getSalas: () => void;
};

const initialState = {
    salaDTO: {
        numeroSala: '' as string,
        serieAno: SerieAno.PRIMEIRO_ANO,
        capacidadeAlunos: 0 as number,
        uuid: '' as string,
    } as SalaDTO,
    options: {
        serieAno: Object.values(SerieAno),
        escolas: [] as Array<GenericTO>,
    },
    escola: '' as string,
};

const FormDialogEscola = (props: TPropsFormDialogEscola) => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const salaSelecionada = props.salaSelecionada;
    const escolaService = EscolaService();
    const canClick = useRef<boolean>(true);
    const salaService = SalaService();

    useEffect(() => {
        if (salaSelecionada) {
            const serieAno = salaSelecionada.serieAno;
            setStateLocal(prevState => ({
                ...prevState,
                salaDTO: {
                    ...prevState.salaDTO,
                    numeroSala: salaSelecionada.numeroSala,
                    capacidadeAlunos: salaSelecionada.capacidadeAlunos,
                    serieAno:
                        SerieAno[serieAno as keyof typeof SerieAno] ?? salaSelecionada.serieAno,
                    uuid: salaSelecionada.uuid,
                },
                escola: salaSelecionada.escolaUUID,
            }));
        }
    }, []);

    const getEscolas = async () => {
        try {
            const { data } = await escolaService.listAllEscolas(stateLocal.salaDTO.serieAno);
            if (data) {
                setStateLocal(prevState => ({
                    ...prevState,
                    options: {
                        ...prevState.options,
                        escolas: data,
                    },
                }));
            }
        } catch {
            console.log('Erro');
        }
    };

    useEffect(() => {
        getEscolas();
    }, [stateLocal.salaDTO.serieAno]);

    // eslint-disable-next-line no-undef
    const onChangeNumeroSala = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                numeroSala: event.target.value,
            },
        }));
    };

    const onChangeSerieAno = (event: SelectChangeEvent<string>) => {
        setStateLocal(prevState => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                serieAno: event.target.value as SerieAno,
            },
        }));
    };

    const onChangeEscola = (event: SelectChangeEvent<string>) => {
        setStateLocal(prevState => ({
            ...prevState,
            escola: event.target.value,
        }));
    };

    const updateSala = async (salaDTO: SalaDTO, salaUuid: string) => {
        try {
            const { data } = await salaService.updateSala(salaDTO, salaUuid);
            if (data) {
                return data;
            }
        } catch (err) {
            if (Axios.isAxiosError(err)) {
                const messageError = err.response?.data.message;
                console.log(messageError);
            }
        }
    };

    const onEditSala = async () => {
        if (canClick.current) {
            canClick.current = false;
            const resultado = await updateSala(stateLocal.salaDTO, stateLocal.salaDTO.uuid);
            if (resultado) {
                props.onCloseDialog();
                props.getSalas();
            }
        }
        canClick.current = true;
    };

    return (
        <>
            <Box sx={{ bottom: 0, display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '35%',
                        justifyContent: 'space-between',
                        height: '260px',
                        marginLeft: '20px',
                        marginRight: '60px',
                    }}
                >
                    <CustomTextField
                        label="Número da Sala"
                        value={stateLocal.salaDTO.numeroSala}
                        onChange={onChangeNumeroSala}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomTextField
                        value={'Capacidade de Alunos:  ' + stateLocal.salaDTO.capacidadeAlunos}
                        onChange={() => {}}
                        error={false}
                        errorMessage={''}
                        disabled={true}
                    />

                    <CustomSelect<string>
                        title={'Série da sala'}
                        value={stateLocal.salaDTO.serieAno}
                        onChange={onChangeSerieAno}
                        options={stateLocal.options.serieAno}
                        error={false}
                        errorMessage={''}
                        sx={{ width: '100%' }}
                    />

                    <CustomSelect<GenericTO>
                        title={'Escola'}
                        value={stateLocal.escola}
                        onChange={onChangeEscola}
                        options={Object.values(stateLocal.options.escolas)}
                        error={false}
                        errorMessage={''}
                        sx={{ width: '100%' }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        position: 'absolute',
                        justifyContent: 'space-between',
                        width: '90%',
                        bottom: 10,
                        marginLeft: '5px',
                    }}
                >
                    <CustomButton
                        onClick={props.onCloseDialog}
                        title="Cancelar"
                        sx={{ borderRadius: '50px' }}
                    />
                    <CustomButton
                        onClick={onEditSala}
                        title="Editar"
                        sx={{ borderRadius: '50px' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', width: '60%', marginBottom: '55px' }}>
                    <img
                        src={ImagemEditEscola}
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

export default FormDialogEscola;
