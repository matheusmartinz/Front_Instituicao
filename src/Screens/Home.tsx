import Box from '@mui/material/Box';
import { useState } from 'react';
import CustomDrawer from '../components/CustomDrawer';
import CustomIcon from '../components/CustomIcon';
import CustomLoginDrawer from '../components/CustomLogin/CustomLoginDrawer';
import CustomTypography from '../components/CustomTypography';
import { useAppSelector } from '../redux/hooks';
import { TipoTelaHome, Usuario } from '../types';
import CadastroLogin from './CadastroLogin';
import Sobre from './Sobre';

const initialState = {
   TipoTelaHome: TipoTelaHome.HOME,
   drawer: false,
   usuario: {
      nome: '' as string,
      login: '' as string,
   } as Usuario,
};

const Home = () => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const usuario = useAppSelector(e => e.usuario);

   const onNavigateSobre = () => {
      setStateLocal(prevState => ({
         ...prevState,
         TipoTelaHome: TipoTelaHome.SOBRE,
      }));
   };

   const openDrawer = () => {
      setStateLocal(prevState => ({
         ...prevState,
         drawer: true,
      }));
   };

   const closeDrawer = () => {
      setStateLocal(prevState => ({
         ...prevState,
         drawer: false,
      }));
   };

   return (
      <>
         {stateLocal.TipoTelaHome === TipoTelaHome.HOME && (
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
                        imageUser="data:image/webp;base64,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"
                     />
                  </Box>
               </Box>
            </Box>
         )}

         {stateLocal.TipoTelaHome === TipoTelaHome.SOBRE && <Sobre />}
         {stateLocal.TipoTelaHome === TipoTelaHome.CADASTRO_LOGIN && <CadastroLogin />}
      </>
   );
};

export default Home;
