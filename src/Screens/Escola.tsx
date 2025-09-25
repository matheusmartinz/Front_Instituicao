import {
      AlertColor,
      Box,
      Button,
      Dialog,
      DialogActions,
      DialogContent,
      DialogContentText,
      DialogTitle,
      IconButton,
} from '@mui/material';
import Axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EscolaService from '../api/services/escola.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDialog from '../components/CustomDialog';
import CustomDrawer from '../components/CustomDrawer';
import CustomSnackbar from '../components/CustomSnackbar';
import CustomTypography from '../components/CustomTypography';
import { EscolaDataGridDTO, EscolaDTO, TipoTelaEscola, UF } from '../types';
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

      //   const handleMenuClick = (
      //         event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      //         escola: EscolaDataGridDTO,
      //   ) => {
      //         event.stopPropagation();
      //         setStateLocal(prevState => ({
      //               ...prevState,
      //               anchorEl: event.currentTarget,
      //               escolaSelecionada: escola,
      //         }));
      //   };

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
            console.log('Escola selecionada para exclusão:', escola);
            setStateLocal(prevState => ({
                  ...prevState,
                  openDialogDelete: true,
                  escolaSelecionada: escola,
            }));
      };

      const columns: GridColDef[] = [
            // {
            //       field: 'selecionar',
            //       headerName: '',
            //       width: 80,
            //       align: 'center',
            //       sortable: false,
            //       disableColumnMenu: true,
            //       renderCell: params => {
            //             const isChecked = stateLocal.escolaSelecionada?.uuid === params.row.uuid;

            //             return (
            //                   <Checkbox
            //                         color="primary"
            //                         checked={isChecked}
            //                         onChange={() => onSelecionaEscola(params.row)}
            //                   />
            //             );
            //       },
            // },
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
                  <CustomDrawer />
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
                  {/* <CustomMenu
                        open={!!stateLocal.anchorEl}
                        anchorEl={stateLocal.anchorEl}
                        onClose={handleMenuClose}
                        children={
                              <>
                                    <MenuItem onClick={onEditEscola}>Editar</MenuItem>
                                    <MenuItem onClick={onExcluir}>Excluir</MenuItem>
                              </>
                        }
                  /> */}
                  <CustomDialog
                        open={stateLocal.openDialogEdit}
                        onClose={onCloseDialog}
                        fullWidth
                        maxWidth="md"
                  >
                        <FormDialogEscola
                              onClickCancelar={onCloseDialog}
                              onClickEditar={() => {}}
                              escolaSelecionada={stateLocal.escolaSelecionada}
                        />
                  </CustomDialog>
                  {/* <CustomDialog open={stateLocal.openDialogDelete} onClose={onCloseDialog} maxWidth="xl">
                        <DialogTitle sx={{ fontSize: '20px' }}>Confirmação</DialogTitle>
                        <DialogContent>
                              <DialogContentText>
                                    Após a exclusão, não terá mais acesso novamente a informação!
                              </DialogContentText>
                              <DialogActions>
                                    <CustomButton onClick={() => {}} title="Aceito" />
                                    <CustomButton onClick={() => {}} title="Cancelar" />
                              </DialogActions>
                        </DialogContent>
                  </CustomDialog> */}

                  <Dialog
                        open={stateLocal.openDialogDelete}
                        onClose={onCloseDialog}
                        aria-labelledby="responsive-dialog-title"
                        sx={{ height: '40%' }}
                  >
                        <DialogTitle>
                              <CustomTypography title="Confirmação" color="black" fontSize="19px" />
                        </DialogTitle>
                        <DialogContent>
                              <DialogContentText>
                                    <CustomTypography
                                          title="Você tem certeza que deseja excluir esta informação?"
                                          color="black"
                                          noFontWeight
                                    />
                              </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                              <Button
                                    autoFocus
                                    onClick={onCloseDialog}
                                    sx={{
                                          bgcolor: 'purple',
                                          borderRadius: '50px',
                                          color: 'white',
                                          fontWeight: 'bold',
                                    }}
                              >
                                    NÃO
                              </Button>
                              <Button
                                    onClick={onExcluir}
                                    autoFocus
                                    sx={{
                                          bgcolor: 'purple',
                                          borderRadius: '50px',
                                          color: 'white',
                                          fontWeight: 'bold',
                                    }}
                              >
                                    SIM
                              </Button>
                        </DialogActions>
                  </Dialog>
                  <CustomSnackbar
                        showSnackbar={stateLocal.snackBar.showSnackbar}
                        duration={3000}
                        onClose={onCloseSnack}
                        snackMessage={stateLocal.snackBar.snackMessage}
                        severity={stateLocal.snackBar.severity}
                  />
            </>
      );
};
export default Escola;
