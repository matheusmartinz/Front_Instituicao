import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalaService from '../api/services/sala.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDialog from '../components/CustomDialog';
import CustomDrawer from '../components/CustomDrawer';
import CustomIcon from '../components/CustomIcon';
import { SalaDataGridDTO, TipoTelaSala } from '../types';
import FormDialogSala from './FormDialogSala';
import NovaSala from './NovaSala';

const initialState = {
      salas: [] as Array<SalaDataGridDTO>,
      tela: TipoTelaSala.LISTA_SALAS,
      escola: '' as string,
      salaSelecionada: null as SalaDataGridDTO | null,
      anchorEl: null as null | HTMLElement,
      openDialog: false
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

    //   const onSelecionaSala = (
    //         // eslint-disable-next-line no-undef
    //         event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    //         sala: SalaDataGridDTO,
    //   ) => {
    //         setStateLocal(prevState => ({
    //               ...prevState,
    //               anchorEl: event.currentTarget,
    //               salaSelecionada: sala,
    //         }));
    //   };

      const onSelecionaSala = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            openDialog: true
        }))
      }

      const getSalas = useCallback(async () => {
            try {
                  const { data } = await salaService.getSalas();
                  setStateLocal(prevState => ({
                        ...prevState,
                        salas: data,
                  }));
                  console.log(data);
                  console.log('AQUI');
            } catch (err) {
                  alert(err);
            }
            //eslint-disable-next-line
      }, []);

      const onNavigateSalaNova = () => {
            navigate('/sala/cadastro');
      };

    //   const onCloseHandleMenu = () => {
    //         setStateLocal(prevState => ({
    //               ...prevState,
    //               anchorEl: null,
    //         }));
    //   };

    //   const onEditSala = () => {
    //         setStateLocal(prevState => ({
    //               ...prevState,
    //                 openDialog: true
    //         }));
    //   };

    const closeDialog = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            openDialog: false
        }))
    }


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
                                          />
                                    </CustomDialog>
                                    {/* <CustomMenu
                                          open={!!stateLocal.openDialog}
                                          anchorEl={stateLocal.anchorEl}
                                          onClose={onCloseHandleMenu}
                                          children={
                                                <>
                                                      <MenuItem onClick={onEditSala}>Editar</MenuItem>
                                                      <MenuItem onClick={() => {}}>TESTE3</MenuItem>
                                                </>
                                          }
                                    /> */}
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
