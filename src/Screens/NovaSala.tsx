import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import SalaService from '../api/services/sala.service';
import CustomButton from '../components/CustomButton';
import { SalaDTO, SerieAno } from '../types';

export type TNovaSalaProps = {
    onGoBack: () => void;
};

const initialState = {
    salaDTO: {
        numeroSala: '' as string,
        serieAno: '' as SerieAno,
        capacidadeAlunos: 30 as number,
        uuid: null as string | null,
    } as SalaDTO,
    escola: '' as string,
};

const NovaSala = (props: TNovaSalaProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const salaService = SalaService();
    // eslint-disable-next-line no-undef
    const onChangeAnoSala = (serieAno: SerieAno) => {
        setStateLocal((prevState) => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                serieAno: serieAno,
            },
        }));
    };

    // eslint-disable-next-line no-undef
    const onChangeNumeroSala = (
        // eslint-disable-next-line no-undef
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStateLocal((prevState) => ({
            ...prevState,
            salaDTO: {
                ...prevState.salaDTO,
                numeroSala: event.target.value,
            },
        }));
    };

    const onPostSala = async (salaDTO: SalaDTO, escolaUUID: string) => {
        try {
            const { data } = await salaService.createSala(
                salaDTO,
                escolaUUID
            );
            if (data) {
                return onPostSala(stateLocal.salaDTO, stateLocal.escola);
            }
        } catch {
            console.log('erro');
        }
    };

    const onClickEnvio = () => {
        return onPostSala(stateLocal.salaDTO, stateLocal.escola);
    };
    console.log(stateLocal.salaDTO, stateLocal.escola);
    return (
        <>
            <Box sx={{ display: 'flex', padding: '10px' }}>
                <CustomButton title="VOLTAR" onClick={props.onGoBack} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '200px',
                    marginLeft: '10%',
                    minHeight: '28%',
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
                        {Object.values(SerieAno).map((serieAno) => {
                            return (
                                <MenuItem
                                    value={serieAno}
                                    onClick={() =>
                                        onChangeAnoSala(serieAno)
                                    }
                                >
                                    {serieAno}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CustomButton
                        title="ENVIAR"
                        onClick={onClickEnvio}
                        sx={{
                            width: '50%',
                            height: '10%',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default NovaSala;
