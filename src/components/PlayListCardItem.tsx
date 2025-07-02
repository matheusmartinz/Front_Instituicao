import { Box } from '@mui/material';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation'; // estilos das setas
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { globalStyles } from '../styles/globalStyles';
import { CardPlaylistDTO } from '../types';
import CustomTypography from './CustomTypography';
import CustomStyleCarousel from './Spotify/CustomStyleCarousel';
import PlayListCardItemItem from './Spotify/PlayListCardItemItem';

export type TPlayListCardItemProps = {
    item: CardPlaylistDTO;
};

const initialState = {
    inicio: true,
    final: false,
};

const PlayListCardItem = (props: TPlayListCardItemProps) => {
    const [stateLocal, setStateLocal] = useState(initialState);

    const onSwipe = (swiper: SwiperClass) => {
        setStateLocal((prevState) => ({
            ...prevState,
            inicio: swiper.isBeginning,
            final: swiper.isEnd,
        }));
    };

    return (
        <>
            <CustomStyleCarousel />
            <Box
                sx={{
                    bgcolor: globalStyles.CINZA_SPOTIFY_BACKGROUND,
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    paddingBottom: '5px',
                    height: '50%',
                    width: '100%',
                }}
            >
                <CustomTypography
                    title={props.item.title}
                    fontSize="24px"
                />
                <Swiper
                    className={`custom-swiper ${
                        stateLocal.inicio ? 'hide-prev' : ''
                    } ${stateLocal.final ? 'hide-next' : ''}`}
                    spaceBetween={5}
                    slidesPerView={4}
                    modules={[Navigation]}
                    navigation
                    onSlideChange={onSwipe}
                    onSwiper={onSwipe}
                    style={{ marginTop: '10px', width: '100%' }}
                >
                    {props.item.itens.map((e, index) => (
                        <SwiperSlide key={index}>
                            <PlayListCardItemItem
                                item={e}
                                hasBorder={props.item.hasBorder}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    );
};

export default PlayListCardItem;
