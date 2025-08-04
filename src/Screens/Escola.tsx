import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Checkbox, IconButton, MenuItem, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { GridColDef } from '@mui/x-data-grid';
import EscolaService from '../api/services/escola.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDrawer from '../components/CustomDrawer';
import CustomMenu from '../components/CustomMenu';
import { EscolaDataGridDTO, TipoTelaEscola } from '../types';
import NovaEscola from './NovaEscola';
import CustomDialog from '../components/CustomDialog';
import CustomTypography from 'components/CustomTypography';
import FormDialogLogin from 'components/FormDialogLogin';
import FormDialogEscola from './FormDialogEscola';
import CustomIcon from 'components/CustomIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialState = {
      escolas: [] as Array<EscolaDataGridDTO>,
      anchorEl: null as null | HTMLElement,
      escolaSelecionada: null as EscolaDataGridDTO | null,
      loading: true as boolean,
      tipoTela: TipoTelaEscola.LISTAESCOLAS,
      openDialog: false,
};

const Escola = () => {
      const [stateLocal, setStateLocal] = useState(initialState);
      const isFirstRender = useRef<boolean>(true);
      const escolaService = EscolaService();

      const handleMenuClick = (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            escola: EscolaDataGridDTO,
      ) => {
            event.stopPropagation();
            setStateLocal(prevState => ({
                  ...prevState,
                  anchorEl: event.currentTarget,
                  escolaSelecionada: escola,
            }));
      };

      const handleMenuClose = () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  anchorEl: null,
                  escolaSelecionada: null,
            }));
      };

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
            setStateLocal(prevState => ({
                  ...prevState,
                  tipoTela: TipoTelaEscola.NOVAESCOLA,
            }));
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
                              };
                        });
                  }
            } catch {
                  alert('Erro ao excluir escola');
            }
      };

      const onExcluir = async () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  anchorEl: initialState.anchorEl,
            }));

            setTimeout(() => {
                  const confirmed = window.confirm('Tem certeza que deseja excluir?');
                  if (confirmed && stateLocal.escolaSelecionada) {
                        deleteByUuid(stateLocal.escolaSelecionada.uuid);
                  } else {
                        alert('Operação cancelada');
                  }
            }, 500);
      };

      const onNavigateEditar = () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  tipoTela: TipoTelaEscola.EDITARESCOLA,
            }));
      };

      const onGoBack = useCallback(() => {
            setStateLocal(prevState => ({
                  ...prevState,
                  tipoTela: initialState.tipoTela,
                  anchorEl: initialState.anchorEl,
            }));
      }, []);

      const columns: GridColDef[] = [
            {
                  field: 'selecionar',
                  headerName: '',
                  width: 80,
                  align: 'center',
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: params => {
                        const isChecked = stateLocal.escolaSelecionada?.uuid === params.row.uuid;

                        return (
                              <Checkbox
                                    color="primary"
                                    checked={isChecked}
                                    onChange={() => onSelecionaEscola(params.row)}
                              />
                        );
                  },
            },
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
                        const isSelecionada = stateLocal.escolaSelecionada?.uuid === params.row.uuid;

                        return (
                              <>
                                    <IconButton onClick={onEditEscola} disabled={!isSelecionada}>
                                          <EditIcon sx={{ marginRight: '5px' }} />
                                    </IconButton>
                                    <IconButton onClick={onExcluir} disabled={!isSelecionada}>
                                          <DeleteIcon />
                                    </IconButton>
                              </>
                        );
                  },
            },
      ];

      //event => onSelecionaEscola(event, params.row

      /*              {
                  field: 'teste',
                  headerName: '',
                  width: 10,
                  align: 'center',
                  sortable: false,
                  disableColumnMenu: true,
                  renderCell: params => {
                        return (
                              <IconButton onClick={event => onSelecionaEscola(event, params.row)}>
                                    <MoreVertIcon />
                              </IconButton>
                        );
                  },
            },*/

      /*  const onSelecionaEscola = (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            escola: EscolaDataGridDTO,
      ) => {
            event.stopPropagation();
            setStateLocal(prevState => ({
                  ...prevState,
                  escolaSelecionada: escola,
            }));
      };*/

      const onSelecionaEscola = (escola: EscolaDataGridDTO) => {
            setStateLocal(prevState => {
                  const isMesma = prevState.escolaSelecionada?.uuid === escola.uuid;
                  return {
                        ...prevState,
                        escolaSelecionada: isMesma ? null : escola,
                  };
            });
      };

      const onCloseDialog = () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  openDialog: false,
            }));
      };

      const onEditEscola = () => {
            setStateLocal(prevState => ({
                  ...prevState,
                  openDialog: true,
                  anchorEl: null,
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
                  <CustomMenu
                        open={!!stateLocal.anchorEl}
                        anchorEl={stateLocal.anchorEl}
                        onClose={handleMenuClose}
                        children={
                              <>
                                    <MenuItem onClick={onEditEscola}>Editar</MenuItem>
                                    <MenuItem onClick={onExcluir}>Excluir</MenuItem>
                              </>
                        }
                  />
                  <CustomDialog open={stateLocal.openDialog} onClose={onCloseDialog} fullWidth maxWidth="md">
                        <FormDialogEscola
                              onClickCancelar={onCloseDialog}
                              onClickEditar={onEditEscola}
                              escolaSelecionada={stateLocal.escolaSelecionada}
                        />
                  </CustomDialog>
            </>
      );
};
export default Escola;
