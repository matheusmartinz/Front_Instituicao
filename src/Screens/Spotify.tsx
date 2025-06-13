import { Box } from '@mui/material';
// import { useRef, useState } from 'react';
import { useEffect, useState } from 'react';
import HomeBody from '../components/HomeBody';
import HomeHeader from '../components/HomeHeader';
import { globalStyles } from '../styles/globalStyles';
import { ArtistaPopularDTO } from '../types';

export type TSugestaoPlaylist = {
    title: string;
    subtitle: string;
    sugestao: string;
};

export type TSpotifyLinks = {
    title: string;
    route: string;
};

const initialState = {
    artistas: [] as Array<ArtistaPopularDTO>,
    musicasEmAlta: [] as Array<ArtistaPopularDTO>,
    sugestoesPlaylist: [] as Array<TSugestaoPlaylist>,
    links: [] as Array<TSpotifyLinks>,
};

const Spotify = () => {
    const [stateLocal, setStateLocal] = useState(initialState);

    const getSugestoesPlaylist = (): Array<TSugestaoPlaylist> => {
        return [
            {
                title: 'Crie sua primeira playlist',
                subtitle: 'É Fácil, vamos te ajudar.',
                sugestao: 'Criar playlist',
            },
            {
                title: 'Que tal seguir um prodcast novo?',
                subtitle: 'Avisaremos você sobre novos episódios.',
                sugestao: 'Explore podcasts',
            },
        ];
    };

    const getSpotifyLinks = (): Array<TSpotifyLinks> => {
        return [
            { title: 'Legal', route: '' },
            { title: 'Seguranca e centro de privacidade', route: '' },
            { title: 'Politica de privacidade', route: '' },
        ];
    };

    useEffect(() => {
        setStateLocal((prevState) => ({
            ...prevState,
            sugestoesPlaylist: getSugestoesPlaylist(),
            links: getSpotifyLinks(),
        }));
    }, []);

    // const spotifyService = SpotifyService();
    // const isFirstRender = useRef<boolean>(true);

    // useEffect(() => {
    //    const artistas =   getArtistas();
    //    const musicasEmAlta =    getArtistas();

    //     setStateLocal((prevState) => ({
    //         ...prevState,
    //         artistas,
    //         musicasEmAlta
    //     }))
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
            }}
        >
            <Box sx={{ width: '100%', height: '100%' }}>
                <HomeHeader />
                <HomeBody
                    sugestoesPlaylist={stateLocal.sugestoesPlaylist}
                    links={stateLocal.links}
                />
            </Box>
        </Box>
    );
};

export default Spotify;
