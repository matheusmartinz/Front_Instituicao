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
        capacidadeAlunos: '' as string,
        uuid: '' as string | null,
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

    // const postSala = async (salaDTO: SalaDTO, escolaUUID: string) => {
    //     try {
    //         const { data } = await salaService.createSala(
    //             salaDTO,
    //             escolaUUID
    //         );
    //         return data;
    //     } catch {
    //         console.log('teste');
    //     }
    // };

    // const onEnviarPedido = () => {
    //     return postSala(stateLocal.salaDTO,stateLocal.escola);
    // };

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
                    <TextField label="Número da Sala" type="number" />
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
                        onClick={() => {}}
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
