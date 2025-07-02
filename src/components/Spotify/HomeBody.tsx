import { Box } from '@mui/material';

import {
    CardPlaylistDTO,
    FooterCardDTO,
    SpotifyLinkDTO,
    SugestaoPlaylistDTO,
} from '../../types';
import PlayListCards from '../PlayListCards';
import CardLibrary from './CardLibrary';

export type THomeBodyProps = {
    sugestoesPlaylist: Array<SugestaoPlaylistDTO>;
    links: Array<SpotifyLinkDTO>;
    playListCards: Array<CardPlaylistDTO>;
    footerCardsTitle: Array<FooterCardDTO>;
};

const HomeBody = (props: THomeBodyProps) => {
    console.log('filho', props.links);
    return (
        <Box
            sx={{
                bgcolor: '#000',
                height: 'calc(85% - 10px)',
                paddingLeft: '10px',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <CardLibrary
                sugestoesPlaylist={props.sugestoesPlaylist}
                links={props.links}
            />
            <PlayListCards
                itensCards={props.playListCards}
                footerTitle={props.footerCardsTitle}
            />
        </Box>
    );
};

export default HomeBody;
