import { Book, SearchRounded } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { globalStyles } from '../styles/globalStyles';
import CustomButton from './CustomButton';
import CustomIcon from './CustomIcon';
import CustomTextField from './CustomTextField';

const HomeHeader = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '7%',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: '5px',
            }}
        >
            <CustomButton
                sx={{
                    display: 'flex',
                    bgcolor: 'red',
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
                    <CustomIcon
                        className="fa-brands fa-spotify"
                        color="white"
                        id="teste"
                        fontSize="30px"
                    />
                }
            />
            <Box
                sx={{
                    width: '40%',
                    height: '100%',
                    bgcolor: 'black',
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
                                    <CustomButton
                                        onClick={() => {}}
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            display: 'flex',
                                            bgcolor: 'gray',
                                            borderRadius: '50px',
                                        }}
                                    >
                                        <Book sx={{ fontSize: '30px' }} />
                                    </CustomButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            <Box sx={{ width: '50%', height: '100%', bgcolor: 'purple' }}>
                {/* <CustomTypography
                 
                /> */}
            </Box>
        </Box>
    );
};

export default HomeHeader;
