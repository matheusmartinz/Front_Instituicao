import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoService from '../api/services/aluno.service';
import CustomButton from '../components/CustomButton';
import { AlunoDataGridDTO } from '../types';
import NovoAluno from './NovoAluno';

export type TInitialState = {
    alunos: Array<AlunoDataGridDTO>;
    loading: boolean;
    anchorEl: null | HTMLElement;
    alunoSelecionado: null | AlunoDataGridDTO;
    tipoTela: TipoTelaAluno;
};

export enum TipoTelaAluno {
    LISTAGEM = 'LISTAGEM',
    CADASTRO = 'CADASTRO',
    EDITAR = 'EDITAR',
}

const initialState: TInitialState = {
    alunos: [],
    loading: true,
    alunoSelecionado: null,
    anchorEl: null,
    tipoTela: TipoTelaAluno.LISTAGEM,
};

const Aluno = () => {
    const [stateLocal, setStateLocal] =
        useState<TInitialState>(initialState);
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
        setStateLocal((prevState) => ({
            ...prevState,
            anchorEl: initialState.anchorEl,
        }));
        setTimeout(() => {
            const confirmed = window.confirm('Você tem certeza disso?');
            if (confirmed && stateLocal.alunoSelecionado) {
                deleteAlunoByUuid(stateLocal.alunoSelecionado.uuid);
            } else {
                alert('Cancelado');
            }
        }, 500);
    };
    const onGoBack = useCallback(() => {
        setStateLocal((prevState) => ({
            ...prevState,
            tipoTela: initialState.tipoTela,
        }));
    }, []);

    const deleteAlunoByUuid = async (uuid: string) => {
        try {
            const response = await alunoService.deleteAlunoByUuid(uuid);
            if (response.status === 204) {
                setStateLocal((prevState) => {
                    return {
                        ...prevState,
                        alunos: prevState.alunos.filter(
                            (aluno) => aluno.uuid !== uuid
                        ),
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
            field: 'escola',
            headerName: 'Escola',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => {
                return (
                    <Typography>{params.row.escola.descricao}</Typography>
                );
            },
        },
        {
            field: 'matricula',
            headerName: 'Matricula',
            width: 95,
            headerAlign: 'left',
        },
        {
            field: 'serie',
            headerName: 'Série',
            width: 20,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'nome',
            headerName: 'Nome',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'ddd',
            headerName: 'DDD',
            width: 50,
            headerAlign: 'left',
        },
        {
            field: 'fone',
            headerName: 'Telefone',
            width: 90,
            headerAlign: 'left',
        },
        {
            field: 'cpf',
            headerName: 'CPF',
            width: 120,
            headerAlign: 'left',
        },
        {
            field: 'cidadeEstado',
            headerName: 'Cidade',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'cep',
            headerName: 'Cep',
            width: 90,
            headerAlign: 'left',
        },
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
                    <IconButton
                        onClick={(event) =>
                            onSelecionaAluno(event, params.row)
                        }
                    >
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
            setStateLocal((prevState) => ({
                ...prevState,
                loading: false,
            }));
            setTimeout(() => {
                alert('Sistema fora do ar');
            }, 500);
        }
    }, []);

    const navegaNovoAluno = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            tipoTela: TipoTelaAluno.CADASTRO,
        }));
    };

    const navegaEditarAluno = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            tipoTela: TipoTelaAluno.EDITAR,
            anchorEl: initialState.anchorEl,
        }));
    };

    return (
        <>
            {stateLocal.tipoTela === TipoTelaAluno.LISTAGEM && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <CustomButton
                            title="Novo Aluno"
                            onClick={navegaNovoAluno}
                            borderRadius="50px"
                            padding="10px"
                            marginRight="10px"
                        />
                    </Box>
                    <Paper
                        sx={{
                            height: 450,
                            width: '100%',
                            marginTop: '10px',
                        }}
                    >
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
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 50 },
                                },
                            }}
                            pageSizeOptions={[10, 15, 25, 50, 100]}
                            sx={{ border: 0 }}
                            localeText={{
                                ...ptBR.components.MuiDataGrid.defaultProps
                                    .localeText,
                                noRowsLabel:
                                    'Não há registros encontrados.',
                            }}
                        />
                    </Paper>
                    <Menu
                        anchorEl={stateLocal.anchorEl}
                        open={!!stateLocal.anchorEl}
                        onClose={onCloseSelecionaAluno}
                    >
                        <MenuItem onClick={navegaEditarAluno}>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={onDeleteAluno}>
                            Excluir
                        </MenuItem>
                    </Menu>
                </>
            )}

            {stateLocal.tipoTela !== TipoTelaAluno.LISTAGEM && (
                <NovoAluno onGoBack={onGoBack} />
            )}
        </>
    );
};

export default Aluno;
