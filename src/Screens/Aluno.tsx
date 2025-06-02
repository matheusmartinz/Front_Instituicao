import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoService from '../api/services/aluno.service';
import { AlunoDataGridDTO } from '../types';

export type TInitialState = {
    alunos: Array<AlunoDataGridDTO>;
    loading: boolean;
    anchorEl: null | HTMLElement;
    alunoSelecionado: null | AlunoDataGridDTO;
};

const initialState: TInitialState = {
    alunos: [],
    loading: true,
    alunoSelecionado: null,
    anchorEl: null,
};

const Aluno = () => {
    const [stateLocal, setStateLocal] = useState<TInitialState>(initialState);
    const alunoService = AlunoService();
    const isFirstRender = useRef<boolean>(true);
    const navigate = useNavigate();

    const onSelecionaAluno = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        aluno: AlunoDataGridDTO
    ) => {
        event.stopPropagation();
        setStateLocal((prevState) => ({
            ...prevState,
            anchorEl: event.currentTarget,
            alunoSelecionado: aluno,
        }));
    };
    const onCloseSelecionaAluno = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            anchorEl: null,
            alunoSelecionado: null,
        }));
    };

    useEffect(() => {
        if (isFirstRender.current) {
            getAlunos();
        }
        isFirstRender.current = false;
    }, []);

    const onDeleteAluno = async () => {
        const confirmed = window.confirm('Você tem certeza disso?');
        if (confirmed && stateLocal.alunoSelecionado) {
            deleteAlunoByUuid(stateLocal.alunoSelecionado.uuid);
        } else {
            alert('Cancelado');
        }
    };

    const deleteAlunoByUuid = async (uuid: string) => {
        try {
            const response = await alunoService.deleteAlunoByUuid(uuid);
            if (response.status === 204) {
                setStateLocal((prevState) => {
                    return {
                        ...prevState,
                        alunos: prevState.alunos.filter((aluno) => aluno.uuid !== uuid),
                        anchorEl: initialState.anchorEl,
                        alunoSelecionado: null,
                    };
                });
            }
        } catch {
            alert('Erro ao excluir aluno');
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'matricula',
            headerName: 'Matricula',
            width: 95,
            headerAlign: 'left',
        },
        { field: 'serie', headerName: 'Série', width: 20, headerAlign: 'center', align: 'center' },
        { field: 'nome', headerName: 'Nome', width: 150, headerAlign: 'left' },
        { field: 'email', headerName: 'Email', width: 150, headerAlign: 'left' },
        { field: 'ddd', headerName: 'DDD', width: 50, headerAlign: 'left' },
        { field: 'fone', headerName: 'Telefone', width: 90, headerAlign: 'left' },
        { field: 'cpf', headerName: 'CPF', width: 120, headerAlign: 'left' },
        { field: 'cidadeEstado', headerName: 'Cidade', width: 150, headerAlign: 'left' },
        { field: 'cep', headerName: 'Cep', width: 90, headerAlign: 'left' },
        {
            field: 'tarefas',
            headerName: 'Qtd Tarefas',
            width: 100,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'disciplinas',
            headerName: 'Qtd Disciplinas',
            width: 120,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'menu',
            headerName: '',
            width: 80,
            align: 'left',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <IconButton onClick={(event) => onSelecionaAluno(event, params.row)}>
                        <MoreVertIcon />
                    </IconButton>
                );
            },
        },
    ];

    const getAlunos = useCallback(async () => {
        try {
            const { data } = await alunoService.findAll();
            setStateLocal((prevState) => ({
                ...prevState,
                alunos: data,
                loading: false,
            }));
        } catch (err) {
            setStateLocal((prevState) => ({ ...prevState, loading: false }));
            setTimeout(() => {
                // alert(err.message);
            }, 600);
        }
    }, []);

    const navegaNovoAluno = () => {
        navigate('/aluno/novo', { state: stateLocal.alunoSelecionado });
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                <Button
                    sx={{
                        color: 'white',
                        width: '15%',
                        backgroundColor: 'transparent',
                        padding: 0,
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'purple',
                            borderRadius: '50px',
                            px: 2,
                            py: 1,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography onClick={navegaNovoAluno} sx={{ fontWeight: 'bold' }}>
                            NOVO ALUNO
                        </Typography>
                    </Box>
                </Button>
            </Box>
            <Paper sx={{ height: 450, width: '100%', marginTop: '10px' }}>
                <DataGrid
                    rows={stateLocal.alunos}
                    getRowId={(row) => row.matricula}
                    columns={columns}
                    loading={stateLocal.loading}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'circular-progress',
                            noRowsVariant: 'circular-progress',
                        },
                    }}
                    initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
                    pageSizeOptions={[10, 15, 25, 50, 100]}
                    sx={{ border: 0 }}
                    localeText={{
                        ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                        noRowsLabel: 'Não há registros encontrados.',
                    }}
                />
            </Paper>
            <Menu
                anchorEl={stateLocal.anchorEl}
                open={!!stateLocal.anchorEl}
                onClose={onCloseSelecionaAluno}
            >
                <MenuItem onClick={navegaNovoAluno}>Editar</MenuItem>
                <MenuItem onClick={onDeleteAluno}>Excluir</MenuItem>
            </Menu>
        </>
    );
};

export default Aluno;
