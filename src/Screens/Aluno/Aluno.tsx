import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AlunoService from '../../api/services/aluno.service';
import CustomButton from '../../components/CustomButton';
import CustomDataGrid from '../../components/CustomDataGrid';
import CustomDialog from '../../components/CustomDialog';
import CustomDrawer from '../../components/CustomDrawer';
import { AlunoDataGridDTO, TInitialState, TipoTelaAluno } from '../../types';
import FormDialogAluno from './FormDialogAluno';
import NovoAluno from './NovoAluno';

const initialState: TInitialState = {
    alunos: [],
    loading: true,
    alunoSelecionado: null,
    tipoTela: TipoTelaAluno.LISTAGEM,
    openDialogEdit: false,
};

const Aluno = () => {
    const [stateLocal, setStateLocal] = useState<TInitialState>(initialState);
    const alunoService = AlunoService();
    const isFirstRender = useRef<boolean>(true);

    const onCloseEditAluno = () => {
        setStateLocal(prevState => ({
            ...prevState,
            openDialogEdit: false,
            alunoSelecionado: null,
        }));
    };

    useEffect(() => {
        if (isFirstRender.current) {
            getAlunos();
        }
        isFirstRender.current = false;
        //eslint-disable-next-line
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'escolaDescricao',
            headerName: 'Escola',
            width: 130,
            headerAlign: 'center',
            align: 'center',
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
            field: 'teste',
            headerName: '',
            width: 105,
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: params => {
                return (
                    <>
                        <IconButton onClick={event => onEditAluno(event, params.row)}>
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

    const onEditAluno = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        aluno: AlunoDataGridDTO,
    ) => {
        event.stopPropagation();
        setStateLocal(prevState => ({
            ...prevState,
            openDialogEdit: true,
            alunoSelecionado: aluno,
        }));
    };
    
    const getAlunos = useCallback(async () => {
        try {
            const { data } = await alunoService.findAll();
            setStateLocal(prevState => ({
                ...prevState,
                alunos: data,
                loading: false,
            }));
        } catch {
            setStateLocal(prevState => ({
                ...prevState,
                loading: false,
            }));
            setTimeout(() => {
                alert('Sistema fora do ar');
            }, 500);
        }
        //eslint-disable-next-line
    }, []);

    const navegaNovoAluno = () => {
        setStateLocal(prevState => ({
            ...prevState,
            tipoTela: TipoTelaAluno.CADASTRO,
        }));
    };

    return (
        <>
            {stateLocal.tipoTela === TipoTelaAluno.LISTAGEM && (
                <>
                    <Box sx={{ marginLeft: '10px' }}>
                        <CustomDrawer />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <CustomButton
                            title="Novo Aluno"
                            onClick={navegaNovoAluno}
                            sx={{
                                borderRadius: '50px',
                                padding: '10px',
                                marginRight: '30px',
                            }}
                            children={<PersonAddIcon sx={{ color: 'white' }} />}
                        />
                    </Box>

                    <CustomDataGrid<AlunoDataGridDTO>
                        rows={stateLocal.alunos}
                        getRowId={(row: AlunoDataGridDTO) => row.matricula}
                        columns={columns}
                        loading={stateLocal.loading}
                        noRowsLabel="Não foram encontrados registros de alunos."
                    />

                    <CustomDialog
                        open={stateLocal.openDialogEdit}
                        onClose={onCloseEditAluno}
                        maxWidth="xl"
                    >
                        <FormDialogAluno
                            onCloseDialog={onCloseEditAluno}
                            alunoSelecionado={stateLocal.alunoSelecionado}
                        />
                    </CustomDialog>
                </>
            )}

            {stateLocal.tipoTela !== TipoTelaAluno.LISTAGEM && (
                <NovoAluno onGoBack={onGoBack} alunoSelecionado={stateLocal.alunoSelecionado} />
            )}
        </>
    );
};

export default Aluno;
