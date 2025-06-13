import { Box, Button, Tooltip } from '@mui/material';
import { TSpotifyLinks, TSugestaoPlaylist } from '../Screens/Spotify';
import CustomIcon from './CustomIcon';
import CustomPlaylist from './CustomPlaylist';
import CustomTypography from './CustomTypography';

export type TCardLibraryProps = {
    sugestoesPlaylist: Array<TSugestaoPlaylist>;
    links: Array<TSpotifyLinks>;
};

const CardLibrary = (props: TCardLibraryProps) => {
    return (
        <Box
            sx={{
                bgcolor: '#121212',
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
                    height: '50%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {props.sugestoesPlaylist.map((item) => {
                    return <CustomPlaylist item={item} />;
                })}
            </Box>
            <Box
                sx={{
                    height: '35%',
                    width: '100%',
                    bgcolor: 'green',
                }}
            >
                {props.links.map((item) => {
                    return <CustomTypography title={item.title} />;
                })}
            </Box>
        </Box>
    );
};

export default CardLibrary;
