import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../api/services/login.service';
import CustomButton from '../../components/CustomButton';
import CustomIcon from '../../components/CustomIcon';
import CustomHeaderLogin from '../../components/CustomLogin/CustomHeaderLogin';
import CustomSnackbar from '../../components/CustomSnackbar';
import CustomTextField from '../../components/CustomTextField';
import CustomTypography from '../../components/CustomTypography';
import { TDadosUsuario, onLogin } from '../../redux/features/usuario';
import { useAppDispatch } from '../../redux/hooks';
import { LoginDTO, TipoTelaHome } from '../../types';
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
        severity: '',
    },
    error: {
        login: false,
        senha: false,
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
                login: event.target.value.toLowerCase(),
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
                error: {
                    ...prevState.error,
                    login: true,
                    senha: true,
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
                    uuid: data.uuid,
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
                    message: 'Email ou senha incorreto',
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
                    <Box sx={{ display: 'flex', height: '100vh' }}>
                        <Box
                            sx={{
                                width: '50%',
                                border: 'solid 1px black',
                                borderRadius: '20px',
                                height: '60vh',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '5%',
                                marginLeft: '25%',
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
                                        'data:image/png;base64,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'
                                    }
                                    title="Tela de login"
                                    color="black"
                                />
                            </Box>

                            <Box
                                component="form"
                                onSubmit={e => {
                                    e.preventDefault();
                                    onAuthentic(stateLocal.loginDTO);
                                }}
                                sx={{
                                    height: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <CustomTextField
                                    value={stateLocal.loginDTO.login}
                                    onChange={onChangeLogin}
                                    error={stateLocal.error.login}
                                    label="Insira seu email"
                                    sx={{
                                        width: '45%',
                                        '& .MuiInputBase-root': {
                                            height: '50px',
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
                                    error={stateLocal.error.senha}
                                    errorMessage={''}
                                    label="Insira sua senha"
                                    sx={{
                                        width: '45%',
                                        '& .MuiInputBase-root': {
                                            height: '50px',
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
                                    type="submit"
                                    onClick={() => {}}
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
                    </Box>
                    {stateLocal.tipoTela !== TipoTelaHome.LOGIN && <CadastroLogin />}
                </>
            )}
            <CustomSnackbar
                showSnackbar={stateLocal.snackBar.show}
                duration={3000}
                onClose={onCloseSnack}
                snackMessage={stateLocal.snackBar.message}
                severity={'error'}
            />
        </>
    );
};
export default Login;
