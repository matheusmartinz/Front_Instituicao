import { Alert, Box, Snackbar } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../api/services/login.service';
import CustomButton from '../components/CustomButton';
import CustomIcon from '../components/CustomIcon';
import CustomHeaderLogin from '../components/CustomLogin/CustomHeaderLogin';
import CustomTextField from '../components/CustomTextField';
import CustomTypography from '../components/CustomTypography';
import { onLogin, TDadosUsuario } from '../redux/features/usuario';
import { useAppDispatch } from '../redux/hooks';
import { LoginDTO, TipoTelaHome } from '../types';
import CadastroLogin from './CadastroLogin';

const initialState = {
   loginDTO: {
      login: '' as string,
      senha: '' as string,
   } as LoginDTO,
   tipoTela: TipoTelaHome.LOGIN,
   visible: false as boolean,
   snackBar: {
      show: false as boolean,
      message: '',
      severity: 'success' as 'success' | 'error',
   },
};

const Login = () => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const navigate = useNavigate();
   const loginService = LoginService();
   const dispatch = useAppDispatch();

   const onCadastro = () => {
      navigate('/cadastro');
      setStateLocal(prevState => ({
         ...prevState,
         tipoTela: TipoTelaHome.CADASTRO_LOGIN,
      }));
   };

   // eslint-disable-next-line no-undef
   const onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         loginDTO: {
            ...prevState.loginDTO,
            login: event.target.value,
         },
      }));
   };

   // eslint-disable-next-line no-undef
   const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         loginDTO: {
            ...prevState.loginDTO,
            senha: event.target.value,
         },
      }));
   };

   const onVisiblePassword = () => {
      setStateLocal(prevState => ({
         ...prevState,
         visible: !prevState.visible,
      }));
   };

   const postAutenticarLogin = useCallback(async (loginDTO: LoginDTO) => {
      if (!loginDTO.login && !loginDTO.senha) {
         return setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
               ...prevState.snackBar,
               show: true,
               severity: 'error',
               message: 'Favor informe o e-mail e senha',
            },
         }));
      }
      if (!loginDTO.login) {
         return setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
               ...prevState.snackBar,
               show: true,
               severity: 'error',
               message: 'Favor informe o e-mail',
            },
         }));
      }
      if (!loginDTO.senha) {
         return setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
               ...prevState.snackBar,
               show: true,
               severity: 'error',
               message: 'Favor informe a senha',
            },
         }));
      }

      try {
         const { data } = await loginService.autenticarLogin(loginDTO);
         if (data) {
            const dados: TDadosUsuario = {
               nome: data.nome,
               email: data.login,
            };
            dispatch(onLogin(dados));
         }
         return data;
      } catch {
         setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
               ...prevState.snackBar,
               show: true,
               severity: 'error',
               message: 'erro',
            },
         }));
         // return console.log(errorMessage);
      }
   }, []);

   const onAuthentic = useCallback(async (loginDTO: LoginDTO) => {
      const response = await postAutenticarLogin(loginDTO);
      if (response) {
         navigate('/home');
      } else {
         // setSnackbarMessage('Erro ao logar');
      }
      //eslint-disable-next-line
   }, []);

   const onCloseSnack = () => {
      setStateLocal(prevState => ({
         ...prevState,
         snackBar: {
            ...prevState.snackBar,
            show: false,
         },
      }));
   };

   return (
      <>
         {stateLocal.tipoTela === TipoTelaHome.LOGIN && (
            <>
               <Box
                  sx={{
                     width: '55%',
                     marginLeft: '22.5%',
                     height: '65%',
                     marginTop: '28px',
                     border: 'solid 1px black',
                     borderRadius: '20px',
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        width: '100%',
                        height: '35%',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <CustomHeaderLogin
                        imageSrc={
                           'https://static.vecteezy.com/ti/vetor-gratis/p1/7407996-user-icon-person-icon-client-symbol-login-head-sign-icon-design-vetor.jpg'
                        }
                        title={'Tela de login'}
                        color="black"
                        marginTop="10px"
                     />
                  </Box>

                  <Box
                     sx={{
                        height: '43%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <CustomTextField
                        value={stateLocal.loginDTO.login}
                        onChange={onChangeLogin}
                        error={false}
                        errorMessage={''}
                        label="Insira seu email"
                        sx={{
                           width: '45%',
                           '& .MuiInputBase-root': {
                              height: '40px',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: 'green',
                           },
                           '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                 borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                 borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                 borderColor: 'black',
                              },
                           },
                        }}
                        slotProps={{
                           input: {
                              startAdornment: (
                                 <CustomIcon
                                    className="fa-solid fa-envelope"
                                    id=""
                                    color="black"
                                    marginRight="10px"
                                 />
                              ),
                           },
                        }}
                     />
                     <CustomTextField
                        value={stateLocal.loginDTO.senha}
                        type={stateLocal.visible ? 'text' : 'password'}
                        onChange={onChangePassword}
                        error={false}
                        errorMessage={''}
                        label="Insira sua senha"
                        sx={{
                           width: '45%',
                           '& .MuiInputBase-root': {
                              height: '40px',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: 'green',
                           },
                           '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                 borderColor: 'black',
                              },
                              '&:hover fieldset': {
                                 borderColor: 'black',
                              },
                              '&.Mui-focused fieldset': {
                                 borderColor: 'black',
                              },
                           },
                        }}
                        slotProps={{
                           input: {
                              startAdornment: (
                                 <CustomIcon
                                    className="fa-solid fa-lock"
                                    id=""
                                    color="black"
                                    marginRight="10px"
                                 />
                              ),
                              endAdornment: (
                                 <CustomIcon
                                    className={
                                       stateLocal.visible
                                          ? 'fa-solid fa-eye'
                                          : 'fa-solid fa-eye-slash'
                                    }
                                    id=""
                                    color="black"
                                    onClick={onVisiblePassword}
                                    cursor="pointer"
                                 />
                              ),
                           },
                        }}
                     />

                     <Box
                        sx={{
                           display: 'flex',
                           width: '40%',
                           justifyContent: 'space-between',
                           marginTop: '10px',
                        }}
                     >
                        <CustomTypography title="Não tem cadastro?" color="black" />
                        <CustomTypography
                           title="Cadastrar-se"
                           color="#4169E1"
                           textDecoration="underline"
                           onClick={onCadastro}
                           cursor="pointer"
                        />
                     </Box>
                     <CustomButton
                        onClick={() => onAuthentic(stateLocal.loginDTO)}
                        title="Logar"
                        sx={{
                           marginTop: '12px',
                           borderRadius: '20px',
                           bgcolor: 'black',
                           transform: 'scale(1)',
                           transition: 'transform 0.3s ease',
                           '&:hover': {
                              transform: 'scale(1.1)',
                           },
                           width: '18%',
                        }}
                     />
                  </Box>
               </Box>
               {stateLocal.tipoTela !== TipoTelaHome.LOGIN && <CadastroLogin />}
            </>
         )}
         <Snackbar
            open={stateLocal.snackBar.show}
            autoHideDuration={3000}
            onClose={onCloseSnack}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         >
            <Alert
               severity={stateLocal.snackBar.severity}
               sx={{ width: '100%', borderRadius: '20px' }}
            >
               {stateLocal.snackBar.message}
            </Alert>
         </Snackbar>
      </>
   );
};
export default Login;
