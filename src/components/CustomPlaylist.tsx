import { Box } from '@mui/material';
import { SugestaoPlaylistDTO } from '../types';
import CustomTypography from './CustomTypography';
import CustomWhiteButton from './CustomWhiteButton';

export type TCustomPlaylistProps = {
    item: SugestaoPlaylistDTO;
};

const CustomPlaylist = (props: TCustomPlaylistProps) => {
    return (
        <Box
            sx={{
                width: '96%',
                height: '150px',
                bgcolor: '#1f1f1f',
                borderRadius: '10px',
                marginTop: '10px',
                paddingLeft: '30px',
                paddingTop: '30px',
                paddingBottom: '20px',
            }}
        >
            <CustomTypography title={props.item.title} fontSize="16px" />
            <CustomTypography
                title={props.item.subtitle}
                fontSize="12px"
                marginTop="5px"
                noFontWeight
            />
            <CustomWhiteButton
                title={props.item.sugestao}
                sx={{
                    borderRadius: '20px',
                    height: '25px',
                    marginTop: '15px',
                }}
                fontSize="15px"
            />
        </Box>
    );
};

export default CustomPlaylist;
