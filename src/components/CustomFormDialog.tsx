import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import CustomIcon from './CustomIcon';
import CustomTextField from './CustomTextField';

const initialState = {
   visible: true,
   visibleNew: true,
   visibleConfirm: true,
   usuarioEdit: {
      nome: '' as string,
      email: '' as string,
      senha: '' as string,
      newPassword: '' as string,
      confirmPassword: '' as string,
   },
};

const CustomFormDialog = () => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const usuarioEdit = useAppSelector(e => e.usuario);

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
            email: event.target.value,
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

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
               flexDirection: 'column',
               alignItems: 'center',
            }}
         >
            <CustomTextField
               value={usuarioEdit.nome}
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
               value={usuarioEdit.email}
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
               error={false}
               errorMessage={''}
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
               value={stateLocal.usuarioEdit.newPassword}
               onChange={onChangeNewPassword}
               error={false}
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
               value={stateLocal.usuarioEdit.confirmPassword}
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
      </>
   );
};

export default CustomFormDialog;
