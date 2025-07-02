import { Box } from '@mui/material';
import { useState } from 'react';
import { CardItemPlayListDTO } from '../../types';
import CustomPlayButtonAnimated from '../CustomPlayButtonAnimated';
import CustomTypography from '../CustomTypography';

const initialState = {
    showPlayButton: false as boolean,
};

export type TCardPlaylistDTOProps = {
    item: CardItemPlayListDTO;
    hasBorder: boolean;
};

const PlayListCardItemItem = (props: TCardPlaylistDTOProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);

    return (
        <Box
            tabIndex={0}
            onMouseEnter={() => {
                setStateLocal((prevState) => ({
                    ...prevState,
                    showPlayButton: true,
                }));
            }}
            onMouseLeave={() => {
                setStateLocal((prevState) => ({
                    ...prevState,
                    showPlayButton: false,
                }));
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingX: props.hasBorder ? '22px' : '12px',
                paddingTop: '5px',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
                '&:hover': {
                    background:
                        'linear-gradient(180deg, #1f1f1f, #2F2F2F)',
                    color: 'black',
                },
                borderRadius: '10px',
                position: 'relative',
                // minHeight: '270px',
            }}
        >
            <Box
                component="img"
                src={props.item.image}
                alt="imagem"
                sx={{
                    width: '150px',
                    height: '150px',
                    borderRadius: props.hasBorder ? '50%' : '10px',
                }}
            />
            <Box
                sx={{
                    maxWidth: '200px',
                    margin: 0,
                }}
            >
                <Box>
                    <CustomTypography
                        title={props.item.title}
                        fontSize="15px"
                        marginTop="10px"
                    />
                </Box>
                <CustomTypography
                    title={props.item.subTitle}
                    fontSize="13px"
                    noFontWeight
                    color="#b3b3b3"
                />
            </Box>

            {/* <CustomWhiteButton icon="fas fa-play" sx={{}} /> */}
            {stateLocal.showPlayButton && <CustomPlayButtonAnimated />}
        </Box>
    );
};

export default PlayListCardItemItem;
