import { Box } from '@mui/material';
// import { useRef, useState } from 'react';
import { useEffect, useState } from 'react';
import SpotifyService from '../api/services/spotify.service';
import CustomTypography from '../components/CustomTypography';
import CustomWhiteButton from '../components/CustomWhiteButton';
import HomeBody from '../components/Spotify/HomeBody';
import HomeHeader from '../components/Spotify/HomeHeader';
import { globalStyles } from '../styles/globalStyles';
import {
    ArtistaPopularDTO,
    CardPlaylistDTO,
    FooterCardDTO,
    SpotifyLinkDTO,
    SugestaoPlaylistDTO,
} from '../types';

const initialState = {
    artistas: [] as Array<ArtistaPopularDTO>,
    musicasEmAlta: [] as Array<ArtistaPopularDTO>,
    sugestoesPlaylist: [] as Array<SugestaoPlaylistDTO>,
    links: [] as Array<SpotifyLinkDTO>,
    playListCard: [] as Array<CardPlaylistDTO>,
    footerTitles: [] as Array<FooterCardDTO>,
};

const Spotify = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const spotifyService = SpotifyService();

    const getSugestoesPlaylist = async () => {
        try {
            const { data } = await spotifyService.getSugestoesPlaylist();
            return data;
        } catch {
            return [];
        }
    };

    const getSpotifyLinks = async () => {
        try {
            const { data } = await spotifyService.getSpotifyLinks();
            return data;
        } catch {
            return [];
        }
    };

    const getPlayListCards = async () => {
        try {
            const { data } = await spotifyService.getPlayListCards();
            return data;
        } catch {
            return [];
        }
    };

    const getFooterTitles = async () => {
        try {
            const { data } = await spotifyService.getFooterCards();
            return data;
        } catch {
            return [];
        }
    };

    const fetchAllData = async () => {
        const sugestoes = await getSugestoesPlaylist();
        const spotifyLinks = await getSpotifyLinks();
        const playListCards = await getPlayListCards();
        const footerTitleCards = await getFooterTitles();
        getPlayListCards();
        setStateLocal((prevState) => ({
            ...prevState,
            sugestoesPlaylist: sugestoes,
            links: spotifyLinks,
            playListCard: playListCards,
            footerTitles: footerTitleCards,
        }));
    };

    useEffect(() => {
        // getPlayListCards();
        // getSpotifyLinks();
        // getSugestoesPlaylist();
        fetchAllData();
        //eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     const artistas = getArtistas();
    //     const musicasEmAlta = getArtistas();

    //     setStateLocal((prevState) => ({
    //         ...prevState,
    //         artistas,
    //         musicasEmAlta,
    //     }));
    // }, []);

    // const getArtistas = async () => {
    //     try {
    //         const { data } = await spotifyService.getArtistas();
    //         return data;
    //     } catch (err) {
    //         return [];
    //     }
    // };

    console.log('pai', stateLocal.links);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                bgcolor: globalStyles.PRETO,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ width: '100%', height: '100%' }}>
                <HomeHeader />
                <HomeBody
                    sugestoesPlaylist={stateLocal.sugestoesPlaylist}
                    links={stateLocal.links}
                    playListCards={stateLocal.playListCard}
                    footerCardsTitle={stateLocal.footerTitles}
                />

                <Box
                    onClick={() => {}}
                    sx={{
                        background:
                            'linear-gradient(90deg, #af2896, #509bf5)',
                        height: '8%',
                        width: '99.5%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 2,
                        color: 'white',
                        cursor: 'pointer',
                    }}
                >
                    <CustomTypography
                        title="Testar o Premium de graça"
                        fontSize="13px"
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <CustomTypography
                            title="Inscreva-se para curtir música ilimitada e podcasts só com alguns anúncios. Não precisa de cartão de crédito."
                            noFontWeight
                        />
                        <CustomWhiteButton
                            title="Increva-se grátis"
                            sx={{
                                marginBottom: '17px',
                                borderRadius: '30px',
                                height: '45px',
                                width: '18%',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Spotify;
