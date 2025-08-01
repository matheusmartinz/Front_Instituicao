import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EscolaService from '../api/services/escola.service';
import SalaService from '../api/services/sala.service';
import CustomButton from '../components/CustomButton';
import CustomSelect from '../components/CustomSelect';
import { GenericTO, SalaDataGridDTO, SalaDTO, SerieAno, TipoTelaSala } from '../types';
import Sala from './Sala';

const initialState = {
    salaDTO: {
        numeroSala: '' as string,
        serieAno: '' as SerieAno,
        capacidadeAlunos: 30 as number,
        uuid: null as string | null,
    } as SalaDTO,
    escola: '' as string,
    tipoTela: TipoTelaSala.SALA_NOVA,
    options: {
        escola: [] as Array<GenericTO>,
    },
};

export type TNovaSalaProps = {
    salaSelecionada: SalaDataGridDTO | null;
};

const NovaSala = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const salaService = SalaService();
    // const salaSelecionada = props.salaSelecionada;
    const escolaService = EscolaService();
    const navigate = useNavigate();

    const onChangeAnoSala = (serieAno: SerieAno) => {
        setStateLocal(prevState => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                serieAno: serieAno,
            },
        }));
    };

    // useEffect(() => {
    //     if(salaSelecionada) {
    //         setStateLocal((prevState) => ({
    //             ...prevState,
    //             salaDTO: {
    //                 ...prevState.salaDTO,
    //                 numeroSala: salaSelecionada.numeroSala,
    //                 serieAno: salaSelecionada.serieAno,
    //             },
    //             escola: salaSelecionada.escola
    //         }))
    //     }
    // },[])

    const getEscolas = async () => {
        try {
            const { data } = await escolaService.listAllEscolas();
            if (data) {
                setStateLocal(prevState => ({
                    ...prevState,
                    options: {
                        ...prevState.options,
                        escola: data,
                    },
                }));
            }
        } catch {
            console.log('Erro');
        }
    };

    useEffect(() => {
        getEscolas();
        //eslint-disable-next-line
    }, []);

    const onChangeNumeroSala = (event: ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                numeroSala: event.target.value,
            },
        }));
    };

    const onPostSala = async (salaDTO: SalaDTO, escolaUUID: string) => {
        try {
            const { data } = await salaService.createSala(salaDTO, escolaUUID);
            if (data) {
                return navigate('/sala');
            }
        } catch {
            console.log('erro');
        }
    };

    const onGoBack = () => {
        navigate('/sala');
    };

    const onChangeEscola = (event: any) => {
        setStateLocal(prevState => ({
            ...prevState,
            escola: event.target.value,
        }));
    };

    const isTelaSalaNova = useCallback((tipoTela: TipoTelaSala) => {
        return tipoTela === TipoTelaSala.SALA_NOVA;
    }, []);

    return (
        <>
            {isTelaSalaNova(stateLocal.tipoTela) && (
                <>
                    <Box sx={{ display: 'flex', padding: '10px' }}>
                        <CustomButton title="VOLTAR" onClick={onGoBack} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '200px',
                            marginLeft: '10%',
                            minHeight: '43%',
                            justifyContent: 'space-evenly',
                            marginTop: '60px',
                        }}
                    >
                        <FormControl>
                            <TextField
                                label="Capacidade de Alunos"
                                value={stateLocal.salaDTO.capacidadeAlunos}
                                onChange={onChangeNumeroSala}
                                disabled
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                label="Número da Sala"
                                type="number"
                                value={stateLocal.salaDTO.numeroSala}
                                onChange={onChangeNumeroSala}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Ano da Sala</InputLabel>
                            <Select label="Série Ano">
                                {Object.values(SerieAno).map(serieAno => {
                                    return (
                                        <MenuItem value={serieAno} onClick={() => onChangeAnoSala(serieAno)}>
                                            {serieAno}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <CustomSelect<GenericTO>
                            title="Escola"
                            value={stateLocal.escola}
                            onChange={onChangeEscola}
                            options={stateLocal.options.escola}
                            error={false}
                            errorMessage={''}
                            sx={{ width: '100%' }}
                            variant="outlined"
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <CustomButton
                                title="ENVIAR"
                                onClick={() => onPostSala(stateLocal.salaDTO, stateLocal.escola)}
                                sx={{
                                    width: '50%',
                                    height: '10%',
                                }}
                            />
                        </Box>
                    </Box>
                </>
            )}
            {stateLocal.tipoTela !== TipoTelaSala.SALA_NOVA && <Sala />}
        </>
    );
};

export default NovaSala;
