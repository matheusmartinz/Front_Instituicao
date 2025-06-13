import { Book, SearchRounded } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { globalStyles } from '../styles/globalStyles';
import CustomButton from './CustomButton';
import CustomHoverTypography from './CustomHoverTypography';
import CustomIcon from './CustomIcon';
import CustomTextField from './CustomTextField';
import CustomWhiteButton from './CustomWhiteButton';
import LineSeparator from './LineSeparator';

const HomeHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '7%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
                bgcolor: 'red',
            }}
        >
            {/* <CustomButton
                sx={{
                    display: 'flex',
                    padding: 0,
                    margin: 0,
                    alignItems: 'center',
                    justifyItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    height: '100%',
                    marginLeft: '5px',
                    marginTop: '5px',
                }}
                onClick={() => {}}
                children={
                    // <CustomIcon
                    //     className="fa-brands fa-spotify"
                    //     color="white"
                    //     id="teste"
                    //     fontSize="30px"
                    // />
                    <CustomWhiteButton icon="fa-brands fa-spotify" />
                }
            /> */}

            <CustomWhiteButton icon="fa-brands fa-spotify" />
            <Box
                sx={{
                    width: '40%',
                    height: '100%',
                    bgcolor: 'blue',
                    display: 'flex',
                    padding: '3px',
                }}
            >
                <CustomButton
                    sx={{
                        bgcolor: globalStyles.CINZA,
                        borderRadius: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        marginRight: '10px',
                    }}
                    onClick={() => {}}
                    children={
                        <CustomIcon
                            className="fa-solid fa-house"
                            color="white"
                            id="teste"
                            fontSize="24px"
                        />
                    }
                />
                <CustomTextField
                    error={false}
                    errorMessage=""
                    value={'asda'}
                    variant="standard"
                    onChange={() => {}}
                    sx={{
                        borderRadius: '20px',
                        width: '75%',
                        height: '100%',
                        bgcolor: 'grey',
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <CustomButton
                                    onClick={() => {}}
                                    sx={{
                                        borderRadius: '50%',
                                        display: 'flex',
                                        height: '100%',
                                        paddingBottom: '10px',
                                        bgcolor: 'transparent',
                                        marginRight: '10px',
                                    }}
                                >
                                    <SearchRounded
                                        sx={{ fontSize: '30px' }}
                                    />
                                </CustomButton>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    <LineSeparator color="lightgray" />
                                    <Book
                                        sx={{
                                            fontSize: '30px',
                                            color: '#FFF',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {}}
                                    />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '30%',
                        justifyContent: 'space-between',
                        bgcolor: 'green',
                    }}
                >
                    <CustomHoverTypography
                        title="Premium"
                        fontSize="14px"
                    />
                    <CustomHoverTypography
                        title="Suporte"
                        fontSize="14px"
                    />
                    <CustomHoverTypography
                        title="Baixar"
                        fontSize="14px"
                    />
                </Box>
                <LineSeparator color="#FFF" />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: 'calc(65% - 10px)',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <CustomHoverTypography
                        title="Instalar aplicativo"
                        iconName="far fa-arrow-alt-circle-down"
                        id="home-header-instalar-app-icon"
                        fontSize="14px"
                    />
                    <CustomHoverTypography
                        title="Inscrever-se"
                        fontSize="14px"
                    />
                    <CustomWhiteButton
                        title="Entrar"
                        sx={{
                            color: 'black',
                            bgcolor: 'white',
                            borderRadius: '20px',
                            marginTop: '5px',
                            marginLeft: '25px',
                        }}
                        fontSize="12px"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HomeHeader;
