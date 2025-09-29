import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AlertColor, Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Axios from 'axios';
import CustomConfirmation from 'components/CustomConfirmation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalaService from '../../api/services/sala.service';
import CustomButton from '../../components/CustomButton';
import CustomDataGrid from '../../components/CustomDataGrid';
import CustomDialog from '../../components/CustomDialog';
import CustomDrawer from '../../components/CustomDrawer';
import CustomIcon from '../../components/CustomIcon';
import CustomSnackbar from '../../components/CustomSnackbar';
import { SalaDataGridDTO, TipoTelaSala } from '../../types';
import FormDialogSala from './FormDialogSala';
import NovaSala from './NovaSala';

const initialState = {
    salas: [] as Array<SalaDataGridDTO>,
    tela: TipoTelaSala.LISTA_SALAS,
    escola: '' as string,
    salaSelecionada: null as SalaDataGridDTO | null,
    openDialog: false,
    openDialogDelete: false,
    uuid: '' as string,
    snackBar: {
        showSnackbar: false,
        snackMessage: '',
        severity: '' as AlertColor,
    },
};

const Sala = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const salaService = SalaService();
    const isFirstRender = useRef<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isFirstRender.current) {
            getSalas();
        }
        isFirstRender.current = false;
        //eslint-disable-next-line
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'escolaDescricao',
            headerName: 'Escola',
            width: 110,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'numeroSala',
            headerName: 'Numero Sala',
            width: 110,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'serieAno',
            headerName: 'Serie Ano',
            width: 85,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'capacidadeAlunos',
            headerName: 'Capacidade Alunos',
            width: 145,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'alunos',
            headerName: 'Quantidade Alunos',
            width: 150,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'professores',
            headerName: 'Quantidade Professores',
            width: 178,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'tarefas',
            headerName: 'Quantidade Tarefas',
            width: 150,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'teste',
            headerName: '',
            width: 105,
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: params => {
                return (
                    <>
                        <IconButton onClick={event => onSelecionaSala(event, params.row)}>
                            <EditIcon sx={{ marginRight: '5px' }} />
                        </IconButton>
                        <IconButton onClick={event => onExcluirDialog(event, params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    const onSelecionaSala = (
        // eslint-disable-next-line no-undef
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        sala: SalaDataGridDTO,
    ) => {
        event.stopPropagation();
        setStateLocal(prevState => ({
            ...prevState,
            openDialog: true,
            salaSelecionada: sala,
        }));
    };

    const onExcluirDialog = (
        // eslint-disable-next-line no-undef
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        sala: SalaDataGridDTO,
    ) => {
        event.stopPropagation();
        setStateLocal(prevState => ({
            ...prevState,
            openDialogDelete: true,
            salaSelecionada: sala,
            uuid: sala.uuid,
        }));
    };

    const getSalas = useCallback(async () => {
        try {
            const { data } = await salaService.getSalas();
            setStateLocal(prevState => ({
                ...prevState,
                salas: data,
            }));
        } catch (err) {
            alert(err);
        }
        //eslint-disable-next-line
    }, []);

    const onNavigateSalaNova = () => {
        navigate('/sala/cadastro');
    };

    const closeDialog = () => {
        setStateLocal(prevState => ({
            ...prevState,
            openDialog: false,
            openDialogDelete: false,
        }));
    };

    const deleteSala = async (salaUuid: string) => {
        try {
            const salaDeleted = await salaService.deleteSala(salaUuid);
            if (salaDeleted) {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        showSnackbar: true,
                    },
                }));
                getSalas();
            }
        } catch (err) {
            if (Axios.isAxiosError(err)) {
                const errorMessage = err.response?.data.message;
                console.log(errorMessage);
            }
        }
    };

    const onDeleteSala = async () => {
        try {
            await deleteSala(stateLocal.uuid);
            getSalas();
            closeDialog();
        } catch (error) {
            console.error('Erro ao deletar sala:', error);
        }
    };

    const onCloseSnackBar = () => {
        setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
                ...prevState.snackBar,
                showSnackbar: false,
            },
        }));
    };

    return (
        <>
            {stateLocal.tela === TipoTelaSala.LISTA_SALAS && (
                <>
                    <Box sx={{ marginLeft: '10px' }}>
                        <CustomDrawer />
                    </Box>

                    <Box
                        sx={{
                            marginTop: '50px',
                            padding: '10px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                marginRight: '13px',
                            }}
                        >
                            <CustomButton
                                sx={{ borderRadius: '50px' }}
                                title="Nova Sala"
                                onClick={onNavigateSalaNova}
                                children={<CustomIcon className="fas fa-door-closed" id="" />}
                            />
                        </Box>
                        <CustomDataGrid<SalaDataGridDTO>
                            rows={stateLocal.salas}
                            columns={columns}
                            loading={false}
                            getRowId={(row: SalaDataGridDTO) => row.uuid}
                            noRowsLabel={'Não foi possível carregar as salas.'}
                        />

                        <CustomDialog
                            open={stateLocal.openDialog}
                            onClose={closeDialog}
                            fullWidth
                            maxWidth="md"
                        >
                            <FormDialogSala
                                onCloseDialog={closeDialog}
                                salaSelecionada={stateLocal.salaSelecionada}
                                getSalas={getSalas}
                            />
                        </CustomDialog>

                        <CustomConfirmation
                            open={stateLocal.openDialogDelete}
                            onDelete={onDeleteSala}
                            onCancel={closeDialog}
                            dialogTitle={'Confirmação'}
                            dialogText={'Você tem certeza que deseja excluir esta informação?'}
                        />
                    </Box>

                    <CustomSnackbar
                        showSnackbar={stateLocal.snackBar.showSnackbar}
                        onClose={onCloseSnackBar}
                        snackMessage={'Excluído com sucesso'}
                        severity={'success'}
                        duration={5000}
                    />
                </>
            )}
            {stateLocal.tela === TipoTelaSala.SALA_NOVA && (
                <>
                    <NovaSala />
                </>
            )}
        </>
    );
};

export default Sala;
