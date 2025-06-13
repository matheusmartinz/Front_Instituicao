import { Box } from '@mui/material';
import { TSpotifyLinks, TSugestaoPlaylist } from '../Screens/Spotify';
import CardLibrary from './CardLibrary';

export type THomeBodyProps = {
    sugestoesPlaylist: Array<TSugestaoPlaylist>;
    links: Array<TSpotifyLinks>;
};

const HomeBody = (props: THomeBodyProps) => {
    console.log('filho', props.links);
    return (
        <Box
            sx={{
                bgcolor: '#000',
                height: 'calc(93% - 10px)',
                paddingLeft: '10px',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <CardLibrary
                sugestoesPlaylist={props.sugestoesPlaylist}
                links={props.links}
            />

            <Box
                sx={{
                    bgcolor: '#121212',
                    width: '70%',
                    height: '97%',
                    marginTop: '10px',
                    borderRadius: '5px',
                    marginRight: '5px',
                }}
            ></Box>
        </Box>
    );
};

export default HomeBody;
