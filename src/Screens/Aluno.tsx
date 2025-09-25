import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, IconButton, MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AlunoService from '../api/services/aluno.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDrawer from '../components/CustomDrawer';
import CustomMenu from '../components/CustomMenu';
import { AlunoDataGridDTO, TInitialState, TipoTelaAluno } from '../types';
import NovoAluno from './NovoAluno';

const initialState: TInitialState = {
      alunos: [],
      loading: true,
      alunoSelecionado: null,
      anchorEl: null,
      tipoTela: TipoTelaAluno.LISTAGEM,
};

const Aluno = () => {
      const [stateLocal, setStateLocal] = useState<TInitialState>(initialState);
      const alunoService = AlunoService();
      const isFirstRender = useRef<boolean>(true);

      const onSelecionaAluno = (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            aluno: AlunoDataGridDTO,
      ) => {
            event.stopPropagation();
            setStateLocal(prevState => ({
                  ...prevState,
                  anchorEl: event.currentTarget,
                  alunoSelecionado: aluno,
            }));
      };

      const onCloseSelecionaAluno = () => {
            setStateLocal(prevState => ({
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
            //eslint-disable-next-line
      }, []);

      const onDeleteAluno = async () => {
            setStateLocal(prevState => ({
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
            setStateLocal(prevState => ({
                  ...prevState,
                  tipoTela: initialState.tipoTela,
                  anchorEl: initialState.anchorEl,
                  alunoSelecionado: initialState.alunoSelecionado,
            }));
      }, []);

      const deleteAlunoByUuid = async (uuid: string) => {
            try {
                  const response = await alunoService.deleteAlunoByUuid(uuid);
                  if (response.status === 204) {
                        setStateLocal(prevState => {
                              return {
                                    ...prevState,
                                    alunos: prevState.alunos.filter(aluno => aluno.uuid !== uuid),
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
                  field: 'menu',
                  headerName: '',
                  width: 80,
                  align: 'left',
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: params => {
                        return (
                              <IconButton onClick={event => onSelecionaAluno(event, params.row)}>
                                    <MoreVertIcon />
                              </IconButton>
                        );
                  },
            },
      ];

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

      const navegaEditarAluno = () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  tipoTela: TipoTelaAluno.EDITAR,
            }));
      };

      return (
            <>
                  {stateLocal.tipoTela === TipoTelaAluno.LISTAGEM && (
                        <>
                              <CustomDrawer />
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

                              <CustomMenu
                                    open={!!stateLocal.anchorEl}
                                    anchorEl={stateLocal.anchorEl}
                                    onClose={onCloseSelecionaAluno}
                                    children={
                                          <>
                                                <MenuItem onClick={navegaEditarAluno}>Editar</MenuItem>
                                                <MenuItem onClick={onDeleteAluno}>Excluir</MenuItem>
                                          </>
                                    }
                              />
                        </>
                  )}

                  {stateLocal.tipoTela !== TipoTelaAluno.LISTAGEM && (
                        <NovoAluno onGoBack={onGoBack} alunoSelecionado={stateLocal.alunoSelecionado} />
                  )}
            </>
      );
};

export default Aluno;
