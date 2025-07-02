import GlobalStyles from '@mui/material/GlobalStyles';

const CustomStyleCarousel = () => {
    return (
        <GlobalStyles
            styles={{
                '.custom-swiper .swiper-button-next, .custom-swiper .swiper-button-prev':
                    {
                        opacity: 0,
                        color: 'white',
                        fontSize: '1px',
                        width: '35px',
                        height: '35px',
                        backgroundColor: '#1C1C1C',
                        borderRadius: '50%',
                        transition: ' 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                '.custom-swiper:hover .swiper-button-next, .custom-swiper:hover .swiper-button-prev':
                    {
                        opacity: 1,
                    },

                '.custom-swiper .swiper-button-prev': {
                    left: 0,
                },
                '.custom-swiper .swiper-button-next': {
                    right: 0,
                },
                '.custom-swiper .swiper-button-next::after, .custom-swiper .swiper-button-prev::after':
                    {
                        fontSize: '16px',
                        lineHeight: 1,
                    },
                '.custom-swiper.hide-prev .swiper-button-prev': {
                    display: 'none !important',
                },
                '.custom-swiper.hide-next .swiper-button-next': {
                    display: 'none !important',
                },
            }}
        />
    );
};

export default CustomStyleCarousel;
