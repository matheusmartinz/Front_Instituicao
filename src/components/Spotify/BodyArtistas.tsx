import { Box } from '@mui/material';
import { globalStyles } from '../styles/globalStyles';
import { ArtistaPopularDTO } from '../types';

export type TBodyArtistasProps = {
    artistas: ArtistaPopularDTO[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BodyArtista = (props: TBodyArtistasProps) => {
    return (
        <Box
            sx={{
                bgcolor: globalStyles.PRETO,
                width: '100%',
                height: '90%',
                display: 'flex',
                paddingTop: '5px',
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    bgcolor: 'yellow',
                    width: '40%',
                    marginRight: '5px',
                    borderRadius: '10px',
                }}
            ></Box>
            <Box
                sx={{
                    height: '100%',
                    bgcolor: globalStyles.CINZA,
                    width: '60%',
                    marginLeft: '5px',
                    borderRadius: '10px',
                }}
            ></Box>
        </Box>
    );
};

export default BodyArtista;
