import { AlertColor, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LoginService from '../api/services/login.service';
import ImagemLogin from '../assets/images/imagemEditCredencials.svg';
import { onUpdate, TDadosUpdateProfle } from '../redux/features/usuario';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { LoginDTO } from '../types';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import CustomSnackbar from './CustomSnackbar';
import CustomTextField from './CustomTextField';

const initialState = {
   visible: true,
   visibleNew: true,
   visibleConfirm: true,
   usuarioEdit: {
      nome: '' as string,
      login: '' as string,
      senha: '' as string,
      newSenha: '' as string,
      uuid: null as string | null,
   } as LoginDTO,
   confirmSenha: '' as string,
   error: {
      nome: false,
      login: false,
      senha: false,
      newSenha: false,
      confirmSenha: false,
   },
   snackBar: {
      showSnack: false,
      message: '',
      severity: '',
   },
};

export type TCustomFormDialog = {
   onCancel: () => void;
   onSucess: () => void;
};

const CustomFormDialog = (props: TCustomFormDialog) => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const usuarioEdit = useAppSelector(e => e.usuario);
   const loginService = LoginService();
   const dispatch = useAppDispatch();

   useEffect(() => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            nome: usuarioEdit.nome,
            login: usuarioEdit.email,
            uuid: usuarioEdit.uuid,
         },
      }));
   }, [usuarioEdit]);

   const onShowPassword = () => {
      setStateLocal(prevState => ({
         ...prevState,
         visible: !prevState.visible,
      }));
   };

   const onShowNewPassword = () => {
      setStateLocal(prevState => ({
         ...prevState,
         visibleNew: !prevState.visibleNew,
      }));
   };

   const onShowPasswordConfirm = () => {
      setStateLocal(prevState => ({
         ...prevState,
         visibleConfirm: !prevState.visibleConfirm,
      }));
   };

   const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            nome: event.target.value,
         },
      }));
   };

   const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            login: event.target.value,
         },
      }));
   };

   const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            newPassword: event.target.value,
         },
      }));
   };

   const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            senha: event.target.value,
         },
      }));
   };

   const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStateLocal(prevState => ({
         ...prevState,
         usuarioEdit: {
            ...prevState.usuarioEdit,
            confirmPassword: event.target.value,
         },
      }));
   };

   const onUpdateProfile = async (loginDTO: LoginDTO) => {
      const senha = stateLocal.usuarioEdit.senha.length === 0;
      const newSenha = stateLocal.usuarioEdit.newSenha?.length === 0;
      const hasError = senha || newSenha;

      if (!hasError) {
         try {
            const { data } = await loginService.updateLogin(loginDTO);
            if (data) {
               const dados: TDadosUpdateProfle = {
                  nome: data.nome,
                  email: data.login,
               };
               dispatch(onUpdate(dados));
               props.onSucess();
            }
            return data;
         } catch {
            console.log('nada');
         }
      }
      setStateLocal(prevState => ({
         ...prevState,
         error: {
            ...prevState.error,
            senha: true,
            newSenha: true,
         },
      }));
   };

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
               flexDirection: 'column',
               alignItems: 'center',
               bgcolor: 'red',
            }}
         >
            <Box sx={{ bgcolor: 'green' }}>
               <img src={ImagemLogin} alt="" style={{ width: '20%', height: '20%' }} />
            </Box>
            <CustomTextField
               value={stateLocal.usuarioEdit.nome}
               onChange={onChangeNome}
               error={false}
               errorMessage={''}
               label="Nome"
               sx={{
                  marginBottom: '9px',
                  width: '80%',
                  '& .MuiInputBase-root': {
                     height: '47px',
                  },
               }}
               slotProps={{
                  input: {
                     startAdornment: (
                        <CustomIcon
                           className="fa-solid fa-user"
                           id=""
                           color="black"
                           marginRight="10px"
                           fontSize="16px"
                        />
                     ),
                  },
               }}
            />
            <CustomTextField
               value={stateLocal.usuarioEdit.login}
               onChange={onChangeEmail}
               error={false}
               errorMessage={''}
               label="Email"
               sx={{
                  marginBottom: '9px',
                  width: '80%',
                  '& .MuiInputBase-root': {
                     height: '47px',
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
                           fontSize="16px"
                        />
                     ),
                  },
               }}
            />
            <CustomTextField
               value={stateLocal.usuarioEdit.senha}
               onChange={onChangePassword}
               error={stateLocal.error.senha}
               errorMessage={'Favor informar a senha'}
               label="Senha Atual"
               sx={{
                  marginBottom: '9px',
                  width: '80%',
                  '& .MuiInputBase-root': {
                     height: '47px',
                  },
               }}
               type={stateLocal.visible ? 'password' : 'text'}
               slotProps={{
                  input: {
                     startAdornment: (
                        <CustomIcon
                           className="fa-solid fa-lock"
                           id=""
                           color="black"
                           marginRight="10px"
                           fontSize="16px"
                        />
                     ),
                     endAdornment: (
                        <CustomIcon
                           className={stateLocal.visible ? 'fas fa-eye-slash' : 'fas fa-eye'}
                           id=""
                           color="black"
                           marginRight="10px"
                           onClick={onShowPassword}
                           cursor="pointer"
                           fontSize="16px"
                        />
                     ),
                  },
               }}
            />
            <CustomTextField
               value={stateLocal.usuarioEdit.newSenha}
               onChange={onChangeNewPassword}
               error={stateLocal.error.newSenha}
               errorMessage={''}
               label="Nova Senha"
               type={stateLocal.visibleNew ? 'password' : 'text'}
               sx={{
                  marginBottom: '9px',
                  width: '80%',
                  '& .MuiInputBase-root': {
                     height: '47px',
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
                           fontSize="16px"
                        />
                     ),
                     endAdornment: (
                        <CustomIcon
                           className={stateLocal.visibleNew ? 'fas fa-eye-slash' : 'fas fa-eye'}
                           id=""
                           color="black"
                           marginRight="10px"
                           onClick={onShowNewPassword}
                           cursor="pointer"
                           fontSize="16px"
                        />
                     ),
                  },
               }}
            />
            <CustomTextField
               value={undefined}
               onChange={onChangeConfirmPassword}
               error={false}
               errorMessage={''}
               label="Confirmar Senha"
               type={stateLocal.visibleConfirm ? 'password' : 'text'}
               sx={{
                  marginBottom: '13%',
                  width: '80%',
                  '& .MuiInputBase-root': {
                     height: '47px',
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
                           fontSize="16px"
                        />
                     ),
                     endAdornment: (
                        <CustomIcon
                           className={stateLocal.visibleConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'}
                           id=""
                           color="black"
                           marginRight="10px"
                           onClick={onShowPasswordConfirm}
                           cursor="pointer"
                           fontSize="16px"
                        />
                     ),
                  },
               }}
            />
         </Box>

         <Box
            sx={{
               display: 'flex',
               bottom: 0,
            }}
         >
            <CustomButton
               onClick={() => onUpdateProfile(stateLocal.usuarioEdit)}
               title="Editar"
               sx={{
                  display: 'flex',
                  bottom: 10,
                  right: 30,
                  position: 'absolute',
               }}
            />
            <CustomButton
               onClick={props.onCancel}
               title="Cancelar"
               sx={{
                  display: 'flex',
                  bottom: 10,
                  left: 30,
                  position: 'absolute',
               }}
            />
         </Box>
         <CustomSnackbar
            showSnackbar={stateLocal.snackBar.showSnack}
            duration={3000}
            onClose={() => {}}
            snackMessage={stateLocal.snackBar.message}
            severity={stateLocal.snackBar.severity as AlertColor}
         />
      </>
   );
};

export default CustomFormDialog;
