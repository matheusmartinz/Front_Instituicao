import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import SpotifyService from '../api/services/spotify.service';
import BodyArtista from '../components/BodyArtistas';
import HomeHeader from '../components/HomeHeader';
import { globalStyles } from '../styles/globalStyles';
import { ArtistaPopularDTO } from '../types';

const initialState = {
    artistas: [] as Array<ArtistaPopularDTO>,
    musicasEmAlta: [] as Array<ArtistaPopularDTO>,
};

const Spotify = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const spotifyService = SpotifyService();
    const isFirstRender = useRef<boolean>(true);

    // useEffect(() => {
    //    const artistas =   getArtistas();
    //    const musicasEmAlta =    getArtistas();

    //     setStateLocal((prevState) => ({
    //         ...prevState,
    //         artistas,
    //         musicasEmAlta
    //     }))
    // }, []);

    const getArtistas = async () => {
        try {
            const { data } = await spotifyService.getArtistas();
            return data;
        } catch (err) {
            return [];
        }
    };

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
                <BodyArtista artistas={stateLocal.artistas} />
            </Box>
        </Box>
    );
};

export default Spotify;
