import { Alert, Snackbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../api/services/login.service';
import CustomButton from '../components/CustomButton';
import CustomIcon from '../components/CustomIcon';
import CustomHeaderLogin from '../components/CustomLogin/CustomHeaderLogin';
import CustomTextField from '../components/CustomTextField';
import CustomTypography from '../components/CustomTypography';
import { globalStyles } from '../styles/globalStyles';
import { LoginDTO, TipoTelaHome } from '../types';
import Home from './Home';
import Login from './Login';

const initialState = {
    loginDTO: {
        login: '' as string,
        senha: '' as string,
        nome: '' as string,
        uuid: null as string | null,
    } as LoginDTO,
    loginConfirmed: '' as string,
    tipoTela: TipoTelaHome.CADASTRO_LOGIN,
    visible: false,
    selectedImage: null as string | null,
    snackBar: {
        open: false as boolean,
        message: '' as string,
        severity: 'error' as 'success' | 'error',
    },
};

const loginService = LoginService();

const CadastroLogin = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const navigate = useNavigate();

    // const onNavigateHome = () => {
    //     setStateLocal((prevState) => ({
    //         ...prevState,
    //         tipoTela: TipoTelaHome.HOME,
    //     }));
    // };

    const buttonShowPassword = () => {
        setStateLocal(prevState => ({
            ...prevState,
            visible: !prevState.visible,
        }));
    };

    const onChangePassword = (
        // eslint-disable-next-line no-undef
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setStateLocal(prevState => ({
            ...prevState,
            loginDTO: {
                ...prevState.loginDTO,
                senha: event.target.value,
            },
        }));
    };

    // eslint-disable-next-line no-undef
    const onChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            loginDTO: {
                ...prevState.loginDTO,
                login: event.target.value,
            },
        }));
    };

    const isValidEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const onChangeUserConfirmed = (
        // eslint-disable-next-line no-undef
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setStateLocal(prevState => ({
            ...prevState,
            loginConfirmed: event.target.value,
        }));
    };

    const postLogin = useCallback(async (loginDTO: LoginDTO, imagem?: File | null) => {
        try {
            const formData = new FormData();
            formData.append('nome', loginDTO.nome);
            formData.append('login', loginDTO.login);
            if (imagem) formData.append('imagem', imagem);
            console.log(formData);
            const { data } = await loginService.createLogin(formData);
            if (data) {
                return data;
            }
        } catch (error: any) {
            if (error.response?.status === 500) {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'Erro ao cadastrar',
                    },
                }));
            } else if (error.response.status === 409) {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'Email já em uso',
                    },
                }));
            } else {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'Erro desconhecido',
                    },
                }));
            }
            setStateLocal(prevState => ({
                ...prevState,
                snackBar: {
                    ...prevState.snackBar,
                    severity: 'error',
                    open: true,
                },
            }));
        }
    }, []);

    const onCadastro = async () => {
        const emailsConferem = stateLocal.loginDTO.login === stateLocal.loginConfirmed;
        const senhaValida = stateLocal.loginDTO.senha.length > 0;

        if (!emailsConferem || !senhaValida) {
            setStateLocal(prevState => ({
                ...prevState,
                snackBar: {
                    ...prevState.snackBar,
                    message: 'Email incorreto ou senha vazia',
                    severity: 'error',
                    open: true,
                },
            }));
            return;
        }

        try {
            const response = await postLogin(stateLocal.loginDTO);
            if (response) {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'Cadastro realizado com sucesso!',
                        severity: 'success',
                        open: true,
                    },
                }));
                navigate('/home');
                setStateLocal(prevState => ({
                    ...prevState,
                    tipoTela: TipoTelaHome.HOME,
                }));
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 500) {
                    setStateLocal(prevState => ({
                        ...prevState,
                        snackBar: {
                            ...prevState.snackBar,
                            message: 'Erro ao cadastrar',
                        },
                    }));
                } else {
                    setStateLocal(prevState => ({
                        ...prevState,
                        snackBar: {
                            ...prevState.snackBar,
                            message: 'Erro inesperado',
                        },
                    }));
                }
            } else {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'Erro desconhecimento',
                    },
                }));
            }

            setStateLocal(prevState => ({
                ...prevState,
                snackBar: {
                    ...prevState.snackBar,
                    severity: 'error',
                    open: true,
                },
            }));
        }
    };

    const onLogin = () => {
        navigate('/login');
        setStateLocal(prevState => ({
            ...prevState,
            tipoTela: TipoTelaHome.LOGIN,
        }));
    };

    // eslint-disable-next-line no-undef
    const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLocal(prevState => ({
            ...prevState,
            loginDTO: {
                ...prevState.loginDTO,
                nome: event.target.value,
            },
        }));
    };

    const onCloseSnackbar = () => {
        setStateLocal(prevState => ({
            ...prevState,
            snackBar: {
                ...prevState.snackBar,
                open: false,
            },
        }));
    };

    const onSelectImage = useCallback((base64: string) => {
        setStateLocal(prevState => ({ ...prevState, selectedImage: base64 }));
    }, []);

    return (
        <>
            {stateLocal.tipoTela === TipoTelaHome.CADASTRO_LOGIN && (
                <>
                    <Box>
                        <Typography
                            color="transparent"
                            sx={{ userSelect: 'none' }}
                        >
                            {/* Sem essa merda, o tamanho quebra - Gambiarra '-'*/}
                            teste
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '55%',
                            marginLeft: '25%',
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
                                justifyContent: globalStyles.JUSTIFY_CENTER,
                                flexDirection: 'column',
                                alignItems: globalStyles.ALIGN_CENTER,
                            }}
                        >
                            <CustomHeaderLogin
                                imageSrc={
                                    stateLocal.selectedImage ??
                                    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRry02aJ6e3ChWpxpEk4kEjROP2LUyKtB8FhBdMLFlJOZWS_6MkAJLA90HnAfXe8w29WvfsbRu81O05L0aK4kW-fpcpwVpjIkWWeofD5KWdLA'
                                }
                                title="Tela de cadastro"
                                color="black"
                                marginTop="10px"
                                imageUser
                                onImageChange={onSelectImage}
                            />
                        </Box>

                        <Box
                            sx={{
                                height: '48%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: globalStyles.ALIGN_CENTER,
                                justifyContent: 'space-between',
                            }}
                        >
                            <CustomTextField
                                value={stateLocal.loginDTO.nome}
                                onChange={onChangeNome}
                                error={false}
                                errorMessage="nada"
                                label="Nome Completo"
                                sx={{
                                    'width': '55%',
                                    '& .MuiInputBase-root': {
                                        height: '40px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black', // cor da borda normal
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black', // ao passar o mouse
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black', // quando estiver focado
                                        },
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
                                            />
                                        ),
                                    },
                                }}
                            />
                            <CustomTextField
                                value={stateLocal.loginDTO.login}
                                onChange={onChangeUser}
                                error={
                                    !!stateLocal.loginDTO.login &&
                                    !isValidEmail(stateLocal.loginDTO.login)
                                }
                                errorMessage="nada"
                                label="Email"
                                sx={{
                                    'width': '55%',
                                    '& .MuiInputBase-root': {
                                        height: '40px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black', // cor da borda normal
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black', // ao passar o mouse
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black', // quando estiver focado
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
                                value={stateLocal.loginConfirmed}
                                onChange={onChangeUserConfirmed}
                                error={
                                    !!stateLocal.loginDTO.login &&
                                    !isValidEmail(stateLocal.loginConfirmed)
                                }
                                errorMessage="nada"
                                label="Confirmação Email"
                                sx={{
                                    'width': '55%',
                                    '& .MuiInputBase-root': {
                                        height: '40px',
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
                                errorMessage="nada"
                                label="Sua senha"
                                sx={{
                                    'width': '55%',
                                    '& .MuiInputBase-root': {
                                        height: '40px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'green',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black', // cor da borda normal
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black', // ao passar o mouse
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black', // quando estiver focado
                                        },
                                    },
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <CustomIcon
                                                id=""
                                                className={
                                                    stateLocal.visible
                                                        ? 'fas fa-eye'
                                                        : 'fas fa-eye-slash'
                                                }
                                                color="black"
                                                border="100%"
                                                padding="10px"
                                                cursor="pointer"
                                                onClick={buttonShowPassword}
                                            />
                                        ),
                                        startAdornment: (
                                            <CustomIcon
                                                className="fa-solid fa-lock"
                                                id=""
                                                color="black"
                                                marginRight="10px"
                                            />
                                        ),
                                    },
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '34%',
                                }}
                            >
                                <CustomTypography
                                    title="Já tem cadastro conosco?"
                                    color="black"
                                    fontSize="13px"
                                />
                                <CustomTypography
                                    title="Login"
                                    color="#4169E1"
                                    fontSize="14px"
                                    onClick={onLogin}
                                    cursor="pointer"
                                    textDecoration="underline"
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                justifyContent: 'center',
                                alignItems: globalStyles.ALIGN_CENTER,
                                display: 'center',
                                marginTop: '15px',
                                height: '50px',
                            }}
                        >
                            <CustomButton
                                title="Cadastrar-se"
                                onClick={onCadastro}
                                sx={{
                                    'width': '30%',
                                    'height': '100%',
                                    'borderRadius': '25px',
                                    'transform': 'scale(1)',
                                    'transition': 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                    'bgcolor': 'black',
                                }}
                            />
                        </Box>
                    </Box>
                </>
            )}
            {stateLocal.tipoTela === TipoTelaHome.HOME && <Home />}
            {stateLocal.tipoTela === TipoTelaHome.LOGIN && <Login />}
            <Snackbar
                open={stateLocal.snackBar.open}
                autoHideDuration={5000}
                onClose={onCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={onCloseSnackbar}
                    severity={stateLocal.snackBar.severity}
                    sx={{ width: '100%', borderRadius: '20px' }}
                >
                    {stateLocal.snackBar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CadastroLogin;
