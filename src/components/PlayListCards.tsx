import { Box } from '@mui/material';
import { globalStyles } from '../styles/globalStyles';
import { CardPlaylistDTO, FooterCardDTO } from '../types';
import PlayListCardItem from './PlayListCardItem';
import FooterCardsTitles from './Spotify/FooterCardsTitles';

export type TCardArtistsProps = {
    itensCards: Array<CardPlaylistDTO>;
    footerTitle: Array<FooterCardDTO>;
};

const PlayListCards = (props: TCardArtistsProps) => {
    return (
        <Box
            sx={{
                width: '70%',
                height: '97%',
                marginTop: '10px',
                borderRadius: '5px',
                overflow: 'hidden',
                overflowY: 'scroll',
                bgcolor: globalStyles.CINZA_SPOTIFY_BACKGROUND,
                '&::-webkit-scrollbar': {
                    width: '7px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#black', // trilho
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'gray', // cor do "ponteiro"
                    borderRadius: '5px',
                },
            }}
        >
            {props.itensCards.map((item) => {
                return <PlayListCardItem item={item} />;
            })}
            <FooterCardsTitles item={props.footerTitle} />;
        </Box>
    );
};

export default PlayListCards;
