import { Box } from '@mui/material';
import EscolaService from 'api/services/escola.service';
import UtilsService from 'api/services/utils.service';
import CustomButton from 'components/CustomButton';
import CustomSelect from 'components/CustomSelect';
import CustomTextField from 'components/CustomTextField';
import { useEffect, useRef, useState } from 'react';
import { EscolaDataGridDTO, EscolaDTO, UF } from 'types';
import ImagemEditEscola from '../assets/images/undraw_edit_escola.svg';

export type TCustomFormDialogEscolaProps = {
    onClickCancelar: () => void;
    escolaSelecionada: EscolaDataGridDTO | null;
    onGetEscolas: () => void;
};

const initialState = {
    escolaDTO: {
        nome: '' as string,
        endereco: {
            cidade: '' as string,
            cep: '' as string,
            estado: '' as UF,
        },
        uuid: null as string | null,
    } as EscolaDTO,
};

const FormDialogEscola = (props: TCustomFormDialogEscolaProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const escolaSelecionada = props.escolaSelecionada;
    const utilService = UtilsService();
    const escolaService = EscolaService();
    const canClickEdit = useRef<boolean>(true);

    const formatCep = (cep: string) => {
        const digits = cep.replace(/\D/g, '').slice(0, 8); // Limita a 8 dígitos
        if (digits.length <= 5) return digits;
        return digits.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    };

    useEffect(() => {
        if (escolaSelecionada) {
            const estado = escolaSelecionada.estado.split('-');
            setStateLocal(prevState => ({
                ...prevState,
                escolaDTO: {
                    ...prevState.escolaDTO,
                    nome: escolaSelecionada.nome,
                    endereco: {
                        ...prevState.escolaDTO.endereco,
                        cidade: escolaSelecionada.cidade,
                        cep: escolaSelecionada.cep,
                        estado:
                            UF[estado[0] as keyof typeof UF] ?? prevState.escolaDTO.endereco.estado,
                    },
                    uuid: escolaSelecionada.uuid,
                },
            }));
        }
    }, []);

    // eslint-disable-next-line no-undef
    const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                nome: event.target.value,
            },
        }));
    };

    // eslint-disable-next-line no-undef
    const onChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cep = event.target.value;
        const digit = cep.replace(/\D/g, '').slice(0, 8);
        setStateLocal(prevState => ({
            ...prevState,
            escolaDTO: {
                ...prevState.escolaDTO,
                endereco: {
                    ...prevState.escolaDTO.endereco,
                    cep: digit,
                },
            },
        }));
    };

    useEffect(() => {
        if (stateLocal.escolaDTO.endereco.cep.length === 8) {
            getCep(stateLocal.escolaDTO.endereco.cep);
        }
        //eslint-disable-next-line
    }, [stateLocal.escolaDTO.endereco.cep]);

    const getCep = async (cep: string) => {
        try {
            const { data } = await utilService.getCep(cep);
            if (data.erro) {
                return setStateLocal(prevState => ({
                    ...prevState,
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
            setStateLocal(prevState => ({
                ...prevState,
                escolaDTO: {
                    ...prevState.escolaDTO,
                    endereco: {
                        ...prevState.escolaDTO.endereco,
                        cidade: data.localidade,
                        estado: UF[data.uf as keyof typeof UF],
                    },
                },
            }));
        } catch (erro) {
            console.log(erro);
        }
    };

    const updateEscola = async (escolaDTO: EscolaDTO, uuid: string) => {
        try {
            const { data } = await escolaService.updateByUUID(escolaDTO, uuid);
            if (data) {
                return data;
            }
        } catch (err) {
            return console.log(err);
        }
    };

    const onEditEscola = async () => {
        if (canClickEdit.current) {
            canClickEdit.current = false;
            const resultado = await updateEscola(stateLocal.escolaDTO, stateLocal.escolaDTO.uuid);
            if (resultado) {
                props.onClickCancelar();
                props.onGetEscolas();
            }
        }
        canClickEdit.current = true;
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
                        value={stateLocal.escolaDTO.nome}
                        onChange={onChangeNome}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomTextField
                        value={formatCep(stateLocal.escolaDTO.endereco.cep)}
                        onChange={onChangeCep}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomTextField
                        value={stateLocal.escolaDTO.endereco.cidade}
                        onChange={() => {}}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomSelect<UF>
                        title={''}
                        value={stateLocal.escolaDTO.endereco.estado}
                        onChange={() => {}}
                        options={Object.values(UF)}
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
                        onClick={props.onClickCancelar}
                        title="Cancelar"
                        sx={{ borderRadius: '50px' }}
                    />
                    <CustomButton
                        onClick={onEditEscola}
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
