import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalaService from '../api/services/sala.service';
import CustomButton from '../components/CustomButton';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDrawer from '../components/CustomDrawer';
import CustomIcon from '../components/CustomIcon';
import { SalaDataGridDTO, TipoTelaSala } from '../types';
import NovaSala from './NovaSala';

const initialState = {
   salas: [] as Array<SalaDataGridDTO>,
   tela: TipoTelaSala.LISTA_SALAS,
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
   ];

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
      navigate('/sala/cadastro');
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
