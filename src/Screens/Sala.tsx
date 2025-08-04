import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalaService from '../api/services/sala.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDrawer from '../components/CustomDrawer';
import CustomIcon from '../components/CustomIcon';
import CustomMenu from '../components/CustomMenu';
import { SalaDataGridDTO, TipoTelaSala } from '../types';
import NovaSala from './NovaSala';

const initialState = {
    salas: [] as Array<SalaDataGridDTO>,
    tela: TipoTelaSala.LISTA_SALAS,
    escola: '' as string,
    salaSelecionada: null as SalaDataGridDTO | null,
    anchorEl: null as null | HTMLElement,
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
            width: 10,
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: params => {
                return (
                    <IconButton onClick={event => handleMenuClick(event, params.row)}>
                        <MoreVertIcon />
                    </IconButton>
                );
            },
        },
    ];

    const handleMenuClick = (
        // eslint-disable-next-line no-undef
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        sala: SalaDataGridDTO,
    ) => {
        setStateLocal(prevState => ({
            ...prevState,
            anchorEl: event.currentTarget,
            salaSelecionada: sala,
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
        setStateLocal((prevState) => ({
            ...prevState,
            tela: TipoTelaSala.SALA_NOVA
        }))
    };

    const onCloseHandleMenu = () => {
        setStateLocal(prevState => ({
            ...prevState,
            anchorEl: null,
        }));
    };

    const onEditSala = () => {
        setStateLocal(prevState => ({
            ...prevState,
            tela: TipoTelaSala.SALA_NOVA,
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
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <CustomButton
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
                        <CustomMenu
                            open={!!stateLocal.anchorEl}
                            anchorEl={stateLocal.anchorEl}
                            onClose={onCloseHandleMenu}
                            children={
                                <>
                                    <MenuItem onClick={onEditSala}>Editar</MenuItem>
                                    <MenuItem onClick={() => {}}>TESTE3</MenuItem>
                                </>
                            }
                        />
                    </Box>
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
