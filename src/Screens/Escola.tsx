import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EscolaService from '../api/services/escola.service';
import { EscolaDataGridDTO } from '../types';
import NovaEscola from './NovaEscola';

const initialState = {
    escolas: [] as Array<EscolaDataGridDTO>,
    anchorEl: null as null | HTMLElement,
    escolaSelecionada: null as EscolaDataGridDTO | null,
    loading: true as boolean,
    tipoTela: TipoTelaEscola.LISTAESCOLAS,
};

export enum TipoTelaEscola {
    LISTAESCOLAS = 'ESCOLAS',
    NOVAESCOLA = 'NOVAESCOLA',
    EDITARESCOLA = 'EDITARESCOLA',
}

const paginationModel = { page: 0, pageSize: 5 };

const Escola = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const isFirstRender = useRef<boolean>(true);
    const navigate = useNavigate();
    const escolaService = EscolaService();

    const handleMenuClick = (
        event: React.MouseEvent<HTMLElement>,
        escola: EscolaDataGridDTO
    ) => {
        event.stopPropagation();
        setStateLocal((prevState) => ({
            ...prevState,
            anchorEl: event.currentTarget,
            escolaSelecionada: escola,
        }));
    };

    const handleMenuClose = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            anchorEl: null,
            escolaSelecionada: null,
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
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'cep',
            headerName: 'Cep',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'pessoas',
            headerName: 'Quantidade de pessoas',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'salas',
            headerName: 'Quantidade de salas',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'teste',
            headerName: '',
            width: 10,
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <IconButton
                        onClick={(event) =>
                            handleMenuClick(event, params.row)
                        }
                    >
                        <MoreVertIcon />
                    </IconButton>
                );
            },
        },
    ];

    useEffect(() => {
        if (isFirstRender.current) {
            getEscolas();
        }
        isFirstRender.current = false;
    }, []);

    const isLoading = useRef<boolean>(true);

    const getEscolas = useCallback(async () => {
        try {
            const { data } = await escolaService.findAll();
            isLoading.current = false;
            setStateLocal((prevState) => ({
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
    }, []);

    const onNavigateEscola = () => {
        navigate(-1);
    };

    const onNavigateNovaEscola = () => {
        navigate('/escola/nova');
    };

    const deleteByUuid = async (uuid: string) => {
        try {
            const response = await escolaService.deleteByUUID(uuid);
            if (response.status === 204) {
                setStateLocal((prevstate) => {
                    return {
                        ...prevstate,
                        escolas: prevstate.escolas.filter(
                            (escola) => escola.uuid !== uuid
                        ),
                        anchorEl: initialState.anchorEl,
                        escolaSelecionada: null,
                    };
                });
            }
        } catch {
            alert('Erro ao excluir escola');
        }
    };

    const onExcluir = async () => {
        const confirmed = window.confirm(
            'Tem certeza que deseja excluir?'
        );
        if (confirmed && stateLocal.escolaSelecionada) {
            deleteByUuid(stateLocal.escolaSelecionada.uuid);
        } else {
            alert('melhor deixa ne');
        }
    };

    const onNavigateEditar = () => {
        navigate('/escola/nova', { state: stateLocal.escolaSelecionada });
    };

    return (
        <>
            {stateLocal.tipoTela === TipoTelaEscola.LISTAESCOLAS} && (
            {
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            onClick={onNavigateNovaEscola}
                            sx={{
                                borderRadius: '50px',
                                bgcolor: 'purple',
                                color: 'whitesmoke',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>
                                NOVA ESCOLA
                            </Typography>
                        </Button>
                    </Box>

                    <Paper sx={{ height: 450, width: '100%' }}>
                        <DataGrid
                            rows={stateLocal.escolas}
                            getRowId={(row) => row.uuid}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 15 },
                                },
                            }}
                            pageSizeOptions={[15, 25, 50, 100]}
                            sx={{ border: 0 }}
                            loading={isLoading.current}
                            slotProps={{
                                loadingOverlay: {
                                    variant: 'circular-progress',
                                    noRowsVariant: 'circular-progress',
                                },
                            }}
                        />
                    </Paper>

                    <Menu
                        anchorEl={stateLocal.anchorEl}
                        open={!!stateLocal.anchorEl}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={onNavigateEditar}>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={onExcluir}>Excluir</MenuItem>
                    </Menu>
                </>
            }
            )
            {stateLocal.tipoTela !== TipoTelaEscola.LISTAESCOLAS && (
                <NovaEscola onGoBack={() => {}} />
            )}
        </>
    );
};

export default Escola;
