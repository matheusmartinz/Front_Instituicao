import { Alert, Snackbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { isAxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../api/services/login.service';
import CustomButton from '../../components/CustomButton';
import CustomIcon from '../../components/CustomIcon';
import CustomHeaderLogin from '../../components/CustomLogin/CustomHeaderLogin';
import CustomTextField from '../../components/CustomTextField';
import CustomTypography from '../../components/CustomTypography';
import { globalStyles } from '../../styles/globalStyles';
import { LoginDTO, TipoTelaHome } from '../../types';
import Home from '../Home';
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
    selectedFile: null as File | null,
    snackBar: {
        open: false as boolean,
        message: '' as string,
        severity: 'error' as 'success' | 'error',
    },
    error: {
        login: false,
        senha: false,
        nome: false,
        loginConfirmed: false,
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
                login: event.target.value.toLowerCase(),
            },
        }));
    };

    const onChangeUserConfirmed = (
        // eslint-disable-next-line no-undef
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setStateLocal(prevState => ({
            ...prevState,
            loginConfirmed: event.target.value.toLocaleLowerCase(),
        }));
    };

    const postLogin = useCallback(async (loginDTO: LoginDTO) => {
        try {
            const { data } = await loginService.createLogin(loginDTO);
            if (data) {
                setStateLocal(prevState => ({
                    ...prevState,
                    snackBar: {
                        ...prevState.snackBar,
                        message: 'TESTESTE',
                        open: true,
                        severity: 'success',
                    },
                }));
                return data;
            }
        } catch (err) {
            if (isAxiosError(err)) {
                setStateLocal(prevState => ({
                    ...prevState,
                    error: {
                        ...prevState.error,
                        nome: true,
                    },
                    snackBar: {
                        ...prevState.snackBar,
                        severity: 'error',
                        open: true,
                        message: err.response?.data.message ?? 'FAIL',
                    },
                }));
            }
        }
    }, []);

    const onCadastro = async () => {
        const errorNome = stateLocal.loginDTO.nome.length === 0;
        const errorLogin = stateLocal.loginDTO.login.length === 0;
        const errorConfirmLogin = stateLocal.loginConfirmed.length === 0;
        const errorLogins = stateLocal.loginConfirmed !== stateLocal.loginDTO.login;
        const errorSenha = stateLocal.loginDTO.senha.length === 0;

        const hasError = errorNome || errorLogin || errorConfirmLogin || errorLogins || errorSenha;

        if (hasError) {
            return setStateLocal(prevState => ({
                ...prevState,
                error: {
                    ...prevState.error,
                    nome: true,
                    login: true,
                    loginConfirmed: true,
                    senha: true,
                },
                snackBar: {
                    ...prevState.snackBar,
                    severity: 'error',
                    open: true,
                    message: 'ERROR',
                },
            }));
        }
        try {
            const response = await postLogin(stateLocal.loginDTO);
            if (response) {
                navigate('/login');
            }
        } catch {
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

    return (
        <>
            {stateLocal.tipoTela === TipoTelaHome.CADASTRO_LOGIN && (
                <>
                    <Box>
                        <Typography color="transparent" sx={{ userSelect: 'none' }}>
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
                                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///+8vLz09PS5ubn39/e3t7fAwMDy8vLu7u78/Pzi4uLV1dXFxcXn5+f5+fnm5uba2trMzMzExMTc3NyzuNnnAAAGxklEQVR4nO2d6bLiIBCFb4AQsmr0/d91ghqNMQsHaYhT/f2aqVsVc+yFBhr8+2MYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYJj6dMO2pspxaI7rUrxOS0lR1o2WeyxfDf3RTV6ZM/XJfI6peD8qyRaxQXZ9E6pf0pmxrLdfUTWXq+idt2fb76p4q86xvU78whqiHl8bIZf077to2uav13i3Z/IYhK+0j72FIXaV+/V2qzF/fzZDZsTWevrDfU6M+rq8WDZpeVjQ2B805dRh9N411ajELmC8DcCYxM6kFzQlowDv5scwoAmSYOVIfKBqr0Aa8kx9m4KjDG/Ah8RieWjZUAu24cYBJR6fJ9FmJOvliQEFnwIfGIq1AQy1wkJh0ZIwgMK3EKAJTSiSPwafERLHYxRI4SEySUcto+gZ0inGRcKD/RDbxBZKVaisSoxdwRMX2hsTIZbiILXAow+NOpkiL0RWiZpvIQXgnZiia+D5qyePVNkn0WWIJTOKjllh+Gq0cXZAYp0BtkgnMsiilzSlNmrmTx9jT8B8KbYfCo1PB+xmaXmDl93aDqP56MoUQojCnc++7BxChePN7L10b1YkRpTplas91cmqBPiaUl0ooMUeJ6uLzMGoj4lEos+pT3sOUPjvGxJHYwm8k+wX7vezY4w+kTafwWCirblWfpcPdnnRMRKeFUpt1Az7MaFDHzykLG7Qi1Tvy7oBJlbQ6JRE4SMQeK+kEtqCTGkeFBlRIl2t66EXy1lGgECfIOWRPJRBbA5b1XpJ50YEBTqUQGwy1u8Aho0KhSOam0Bct3X3UAn17ZNkU+p4bxISDn0K1BFHlJghNOBgRydOSZnUYqq8umAmHSLwgCmkmGEgYyisoUAjkCyQKRCQMJSxQQEt4JIFYIoHSbM8oloByTU6xh4Es5cszGoZDIJ4BI5Is8ENxcoIFYqUbSaqp3T8/k4WHwgJxEopUAw3JuJMObop8AMVEH0mlUE36VAh9AoFCJJmDJdtDITTmhxfYQYOFl0JouAjfQwQtQtErJKhMoS49uCq9KYS8NPyAiE1/yXMpwSQYWkrxKEsHsNlZWoW56yrbFKjDQ56CK4Rmh/LqUZdinxC+bMP2F3oPhdAmTXKFHqkGSjTpFcLLNOBqG4VCdFkanQJjTkqRacC9UXz+BD4//GgBnjxAZ/nQDD8jqWngnlnMggX4dIJ+WmhukWEbM/jWDMXcAt0dxeoauGOVYpcU7jNx3QG24A8nUIi3YTgXNuBIYaFYp8H7ZmXtNijCQUi01ubR7yXPLhI7cKC4PZlivdSnfd0loSqfpmqSNW9o3+IpcTcWPWIwI9q38Gudldpseaoq/HowaTaBkWX9qcZardlRibNfSzXR/qFnd/BgxmpRo1Le1xER7QGD1f+bxnMxE6lUcfa/TIPqlNcXx7mkbM6t6tSNrhPtufminZ2si9YzEEeNUuq+Huh7h4vqtp9F1U+DNu6tCf36zA1ZT5TP2ebVSxPHl/XRK8lOImK9ibaJvW9FvdGtLrNatPDZC7reRHCtZnj9orsNenrZULcUa0f9M6aRspcd6SXIrmOTvlJtPXNXKfOsbscRRIkropGwR9h9BiVnlYxS5tpfsvHU06W/mve/C/f6m7TP23U5SvbFwiGZTonCGFPYf338WRWuJTjtoW6nib7Mdg5ZLON6gob2DKLLkLh5SmYbFzMSn5lxqNzk1ceAd7rrvkTqE4j7E4zW14AW1e5+geQHEHc+Xy+kGEji7pSYWuC2EWXzlby7xs1rYWJcALIRie4rpJsSt/JNhHPAG+k0jMBNiVHOcq+OidKrE2pR4qqjxrlqaKUhO5zAdYmxLv1aLiGRjZh9FqM93v0ty19vUIXLjhJL4NICv0fzxTYLc9GI99N8+qlPc/42nxv7ca/7moVJqHFiSjcfM+LeSjefKAbXZ5n5aOSLk9/uawPOwyK8NSnFvzZ5Eop4A5QbUz9NcUv7ZFAm0Wd5CUxwb+JfOWYbuXazx9e8Wk6T3H35vL80YLX2IfFRA6e5v3QsUKVPx7Mr9266dPdB28+nGApfdH2W/KrkwPXonMFPEl93nZOa0M6GY1ajixIpo9Bikv+UR0ms8AA/HfBHKjC1uDuE42FqaSM0Zak40s9A0gTjEULwRXhPPYyHjoQ244E89ElIMx7OgHfCmfFYETglTFI9ooO++F7jsfVZvtN4fH0W/3j8DX2W0uu0+nHzyyKgs6rfMd8EZ0v+mvWmlN3ueYvuh+WNrMn8L8RNKcuye1D+Z9IYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEY5lf4BzLdcO2TnNmPAAAAAElFTkSuQmCC'
                                }
                                title="Seja bem-vindo campeão"
                                color="black"
                                marginTop="10px"
                                imageUser
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
                                error={stateLocal.error.nome}
                                label="Nome Completo"
                                sx={{
                                    width: '55%',
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
                                error={stateLocal.error.login}
                                errorMessage="nada"
                                label="Email"
                                sx={{
                                    width: '55%',
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
                                error={stateLocal.error.loginConfirmed}
                                errorMessage="nada"
                                label="Confirmação Email"
                                sx={{
                                    width: '55%',
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
                                error={stateLocal.error.senha}
                                errorMessage="nada"
                                label="Senha"
                                sx={{
                                    width: '55%',
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
                                    width: '30%',
                                    height: '100%',
                                    borderRadius: '25px',
                                    transform: 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                    bgcolor: 'black',
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
