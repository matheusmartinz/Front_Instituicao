import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import CustomDrawer from '../components/CustomDrawer';
import CustomFormDialog from '../components/CustomFormDialog';
import CustomIcon from '../components/CustomIcon';
import CustomLoginDrawer from '../components/CustomLogin/CustomLoginDrawer';
import CustomTypography from '../components/CustomTypography';
import { useAppSelector } from '../redux/hooks';
import { TipoTelaHome, Usuario } from '../types';
import CadastroLogin from './CadastroLogin';
import Perfil from './Perfil';
import Sobre from './Sobre';

const initialState = {
   tipoTela: TipoTelaHome.HOME,
   drawer: false,
   usuario: {
      nome: '' as string,
      login: '' as string,
   } as Usuario,
   openDialog: false,
};

const Home = () => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const usuario = useAppSelector(e => e.usuario);
   const navigate = useNavigate();

   const onNavigateSobre = () => {
      setStateLocal(prevState => ({
         ...prevState,
         tipoTela: TipoTelaHome.SOBRE,
      }));
   };

   const openDrawer = () => {
      setStateLocal(prevState => ({
         ...prevState,
         drawer: true,
      }));
   };

   const openDialog = () => {
      setStateLocal(prevState => ({
         ...prevState,
         openDialog: true,
         drawer: false,
      }));
   };

   const closeDrawer = () => {
      setStateLocal(prevState => ({
         ...prevState,
         drawer: false,
      }));
   };

   const onLogout = () => {
      setStateLocal(prevState => ({
         ...prevState,
         usuario: {
            nome: '',
            login: '',
         },
         tipoTela: TipoTelaHome.LOGIN,
      }));
      navigate('/login');
   };

   const onCloseDialog = () => {
      setStateLocal(prevState => ({
         ...prevState,
         openDialog: false,
      }));
   };

   //    const onProfile = () => {
   //       navigate('/perfil');
   //       setStateLocal(prevState => ({
   //          ...prevState,
   //          tipoTela: TipoTelaHome.PERFIL,
   //       }));
   //    };

   //    const onCalcelEdit = () => {
   //       setStateLocal(prevState => ({
   //          ...prevState,
   //          openDialog: false,
   //          drawer: true,
   //       }));
   //    };

   return (
      <>
         {stateLocal.tipoTela === TipoTelaHome.HOME && (
            <Box sx={{ display: 'flex' }}>
               <CustomDrawer hiddenRoutes={['/home']} />

               <Box
                  sx={{
                     width: '71%',
                     flexDirection: 'row',
                     display: 'flex',
                     marginLeft: '71%',
                     justifyContent: 'space-between',
                     marginRight: '5px',
                     marginTop: '2px',
                     height: '50px',
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        width: '70%',
                        marginTop: '6px',
                        height: '40%',
                     }}
                  >
                     <CustomTypography
                        title="Sobre"
                        color="black"
                        onClick={onNavigateSobre}
                        cursor="pointer"
                     />
                     <CustomTypography title="Novidades" color="black" cursor="pointer" />
                  </Box>

                  <Box
                     sx={{
                        width: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <CustomIcon
                        id=""
                        className="fas fa-user-circle"
                        padding="3px"
                        fontSize="30px"
                        marginTop="3px"
                        color="black"
                        onClick={openDrawer}
                        cursor="pointer"
                     />

                     <CustomLoginDrawer
                        onClose={closeDrawer}
                        drawer={stateLocal.drawer}
                        text1={usuario.nome}
                        text2={usuario.email}
                        imageUser="data:image/png;base64,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"
                        onLogout={onLogout}
                        onEdit={openDialog}
                        onClick={() => {}}
                     />
                  </Box>
               </Box>
            </Box>
         )}
         {stateLocal.tipoTela === TipoTelaHome.PERFIL && <Perfil />}
         {stateLocal.tipoTela === TipoTelaHome.SOBRE && <Sobre />}
         {stateLocal.tipoTela === TipoTelaHome.CADASTRO_LOGIN && <CadastroLogin />}

         <CustomDialog open={stateLocal.openDialog} onClose={onCloseDialog} maxWidth="sm" fullWidth>
            <CustomFormDialog />
            <Typography>test</Typography>
            <TextField />
         </CustomDialog>
      </>
   );
};

export default Home;
