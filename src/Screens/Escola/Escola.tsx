import { AlertColor, Box, IconButton } from '@mui/material';
import Axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EscolaService from '../../api/services/escola.service';
import CustomButton from '../../components/CustomButton';
import CustomConfirmation from '../../components/CustomConfirmation';
import CustomDataGrid from '../../components/CustomDataGrid';
import CustomDialog from '../../components/CustomDialog';
import CustomDrawer from '../../components/CustomDrawer';
import CustomSnackbar from '../../components/CustomSnackbar';
import { EscolaDataGridDTO, TipoTelaEscola } from '../../types';
import FormDialogEscola from './FormDialogEscola';

const initialState = {
    escolas: [] as Array<EscolaDataGridDTO>,
    anchorEl: null as null | HTMLElement,
    escolaSelecionada: null as EscolaDataGridDTO | null,
    loading: true as boolean,
    tipoTela: TipoTelaEscola.LISTAESCOLAS,
    openDialogEdit: false,
    openDialogDelete: false,
    snackBar: {
        showSnackbar: false,
        snackMessage: '',
        severity: '' as AlertColor,
    },
};

const Escola = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const isFirstRender = useRef<boolean>(true);
    const escolaService = EscolaService();
    const navigate = useNavigate();

    useEffect(() => {
        if (isFirstRender.current) {
            getEscolas();
        }
        isFirstRender.current = false;
        //eslint-disable-next-line
    }, []);

    const isLoading = useRef<boolean>(true);

    const getEscolas = useCallback(async () => {
        try {
            const { data } = await escolaService.findAll();
            isLoading.current = false;
            setStateLocal(prevState => ({
                ...prevState,
                escolas: data,
            }));
        } catch (err) {
            if (Axios.isAxiosError(err)) {
                if (err.code === 'ERR_NETWORK') {
                    alert('Nosso sistema está fora do ar no momento');
                }
            }
        }
        //eslint-disable-next-line
    }, []);

    const onResetGetEscolas = () => {
        getEscolas();
    };

    const onNavigateNovaEscola = () => {
        navigate('/novaescola');
    };

    const deleteByUuid = async (uuid: string) => {
        try {
            const response = await escolaService.deleteByUUID(uuid);
            if (response.status === 204) {
                setStateLocal(prevstate => {
                    return {
                        ...prevstate,
                        escolas: prevstate.escolas.filter(escola => escola.uuid !== uuid),
                        anchorEl: initialState.anchorEl,
                        escolaSelecionada: null,
                        openDialogDelete: false,
                        snackBar: {
                            ...prevstate.snackBar,
                            severity: 'success',
                            showSnackbar: true,
                            snackMessage: 'Excluído com sucesso',
                        },
                    };
                });
            }
        } catch {
            setStateLocal(prevState => ({
                ...prevState,
                snackBar: {
                    ...prevState.snackBar,
                    snackMessage: 'Erro ao excluir',
                    severity: 'error',
                    showSnackbar: true,
                },
            }));
        }
    };

    const onExcluir = async () => {
        if (stateLocal.escolaSelecionada) {
            deleteByUuid(stateLocal.escolaSelecionada.uuid);
        } else {
            alert('Operação cancelada');
        }
    };

    const onExcluirDialog = (
        // eslint-disable-next-line no-undef
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        escola: EscolaDataGridDTO,
    ) => {
        event.stopPropagation();
        setStateLocal(prevState => ({
            ...prevState,
            openDialogDelete: true,
            escolaSelecionada: escola,
        }));
    };

    const columns: GridColDef[] = [
        {
            field: 'nome',
            headerName: 'Escola',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'cidade',
            headerName: 'Cidade',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 70,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'cep',
            headerName: 'Cep',
            width: 95,
            headerAlign: 'left',
        },
        {
            field: 'pessoas',
            headerName: 'Quantidade de pessoas',
            width: 150,
            headerAlign: 'left',
            align: 'center',
        },
        {
            field: 'salas',
            headerName: 'Quantidade de salas',
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
                        <IconButton onClick={event => onSelecionaEscola(event, params.row)}>
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

    const onSelecionaEscola = (
        // eslint-disable-next-line no-undef
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        escola: EscolaDataGridDTO,
    ) => {
        event.stopPropagation();
        setStateLocal(prevState => ({
            ...prevState,
            escolaSelecionada: escola,
            openDialogEdit: true,
        }));
    };

    const onCloseDialog = () => {
        setStateLocal(prevState => ({
            ...prevState,
            openDialogEdit: false,
            openDialogDelete: false,
        }));
    };

    const onCloseSnack = () => {
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
            <Box sx={{ marginLeft: '10px' }}>
                <CustomDrawer />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <CustomButton
                    sx={{
                        borderRadius: '50px',
                        padding: '10px',
                        marginRight: '10px',
                        marginBottom: '5px',
                    }}
                    title="Nova Escola"
                    onClick={onNavigateNovaEscola}
                    children={<AddBoxIcon sx={{ color: 'white' }} />}
                />
            </Box>
            <CustomDataGrid<EscolaDataGridDTO>
                rows={stateLocal.escolas}
                columns={columns}
                loading={isLoading.current}
                getRowId={(row: EscolaDataGridDTO) => row.uuid}
                noRowsLabel="Não foram encontrados registros das escolas."
            />
            <CustomDialog
                open={stateLocal.openDialogEdit}
                onClose={onCloseDialog}
                fullWidth
                maxWidth="md"
            >
                <FormDialogEscola
                    onClickCancelar={onCloseDialog}
                    escolaSelecionada={stateLocal.escolaSelecionada}
                    onGetEscolas={onResetGetEscolas}
                />
            </CustomDialog>

            <CustomConfirmation
                open={stateLocal.openDialogDelete}
                onDelete={onExcluir}
                onCancel={onCloseDialog}
                dialogTitle={'Confirmação'}
                dialogText={'Você tem certeza que deseja excluir esta informação?'}
            />

            <CustomSnackbar
                showSnackbar={stateLocal.snackBar.showSnackbar}
                duration={5000}
                onClose={onCloseSnack}
                snackMessage={stateLocal.snackBar.snackMessage}
                severity={stateLocal.snackBar.severity}
            />
        </>
    );
};
export default Escola;
