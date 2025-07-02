import { Box, Button, Link, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';

import { globalStyles } from '../../styles/globalStyles';
import { SpotifyLinkDTO, SugestaoPlaylistDTO } from '../../types';
import CustomIcon from '../CustomIcon';
import CustomPlaylist from '../CustomPlaylist';
import CustomTypography from '../CustomTypography';

export type TCardLibraryProps = {
    sugestoesPlaylist: Array<SugestaoPlaylistDTO>;
    links: Array<SpotifyLinkDTO>;
};

const CardLibrary = (props: TCardLibraryProps) => {
    return (
        <Box
            sx={{
                bgcolor: globalStyles.CINZA_SPOTIFY_BACKGROUND,
                width: '30%',
                height: '97%',
                marginTop: '10px',
                marginRight: '5px',
                borderRadius: '5px',
            }}
        >
            <Box
                sx={{
                    height: '10%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: '20px',
                }}
            >
                <CustomTypography
                    title="Sua Biblioteca"
                    marginTop="10px"
                />
                <Tooltip title="Criar playlist ou pasta">
                    <Button>
                        <CustomIcon
                            id=""
                            className="fas fa-plus"
                            fontSize="16px"
                        />
                    </Button>
                </Tooltip>
            </Box>

            <Box
                sx={{
                    height: '35%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor:
                            globalStyles.CINZA_SPOTIFY_BACKGROUND, // trilho
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray', // cor do "ponteiro"
                        borderRadius: '5px',
                    },
                }}
            >
                {props.sugestoesPlaylist.map((item) => {
                    return <CustomPlaylist item={item} />;
                })}
            </Box>
            {/* <Box
                sx={{
                    height: '35%',
                    width: '80%',
                    display: 'flex',
                    marginTop: '10px',
                    bgcolor: 'red',
                    flexWrap: 'wrap',
                    paddingRight: '50px',
                }}
            >
                {props.links.map((item) => {
                    return (
                        <CustomTypography
                            title={item.title}
                            fontSize="10px"
                            noFontWeight
                            marginTop="10px"
                        />
                    );
                })}
            </Box> */}
            <Grid
                container
                spacing={2}
                wrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                padding="20px"
            >
                {props.links.map((elemento) => {
                    return (
                        <Grid maxWidth="80%">
                            <Link
                                underline="none"
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: 0,
                                        height: '1px',
                                        bottom: 0,
                                        left: 0,
                                        backgroundColor: 'white',
                                        transition: 'ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <CustomTypography
                                    title={elemento.title}
                                    fontSize="10px"
                                    noFontWeight
                                    onClick={() => {}}
                                    cursor="pointer"
                                />
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default CardLibrary;
