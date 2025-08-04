import { AlertColor, Box } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoginService from '../api/services/login.service';
import ImagemProfile from '../assets/images/undraw_roxo2.svg';
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
        textError: '',
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

const FormDialogLogin = (props: TCustomFormDialog) => {
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
                newSenha: event.target.value,
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
        //   const newSenha = stateLocal.usuarioEdit.newSenha?.length === 0 && stateLocal.confirmSenha.length > 0;
        const confirmSenha = stateLocal.confirmSenha.length > 0;

        const hasError = senha || confirmSenha;

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
            } catch (err) {
                if (Axios.isAxiosError(err)) {
                    const messageError = err.response?.data.message;
                    setStateLocal(prevState => ({
                        ...prevState,
                        snackBar: {
                            ...prevState.snackBar,
                            showSnack: true,
                            severity: 'error',
                            message: messageError,
                        },
                        error: {
                            ...prevState.error,
                            senha: true,
                            textError: 'Senha incorreta',
                        },
                    }));
                }
            }
        } else {
            setStateLocal(prevState => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    senha: true,
                    confirmSenha: true,
                },
                snackBar: {
                    ...prevState.snackBar,
                    message: 'Senha atual obrigatória',
                    severity: 'error',
                    showSnack: true,
                },
            }));
        }
    };

    const onCloseSnack = () => {
        setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
                ...prevState.snackBar,
                showSnack: false,
            },
        }));
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
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
                                height: '49px',
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
                        error={stateLocal.error.login}
                        errorMessage=""
                        textError={stateLocal.error.textError}
                        label="Email"
                        sx={{
                            marginBottom: '15px',
                            width: '80%',
                            '& .MuiInputBase-root': {
                                height: '49px',
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
                        required
                        textError={stateLocal.error.textError}
                        sx={{
                            marginBottom: '9px',
                            width: '80%',
                            '& .MuiInputBase-root': {
                                height: '49px',
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
                                height: '49px',
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
                            marginBottom: '11%',
                            width: '80%',
                            '& .MuiInputBase-root': {
                                height: '49px',
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
                                        className={
                                            stateLocal.visibleConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'
                                        }
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
                <Box sx={{ display: 'flex', width: '60%' }}>
                    <img
                        src={ImagemProfile}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                            userSelect: 'none',
                            pointerEvents: 'none',
                        }}
                        draggable={false}
                    />
                </Box>
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
                        borderRadius: '50px',
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
                        borderRadius: '50px',
                    }}
                />
            </Box>
            <CustomSnackbar
                showSnackbar={stateLocal.snackBar.showSnack}
                duration={5000}
                snackMessage={stateLocal.snackBar.message}
                severity={stateLocal.snackBar.severity as AlertColor}
                onClose={onCloseSnack}
            />
        </>
    );
};

export default FormDialogLogin;
