import { Box, Typography } from '@mui/material';
import { TCustomHoverTypographyProps } from '../types';
import CustomIcon from './CustomIcon';

const CustomHoverTypography = (props: TCustomHoverTypographyProps) => {
    return (
        <Box
            onClick={() => {}}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#b3b3b3',
                transition: 'transform 0.3s ease, color 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'white',
                },
            }}
        >
            {props.iconName !== undefined && (
                <CustomIcon
                    id={props.id}
                    className={
                        props.iconName.length !== 0
                            ? props.iconName
                            : 'fas fa-question'
                    }
                    fontSize={props.fontSize}
                    color={props.color}
                    marginRight="10px"
                />
            )}
            <Typography
                sx={{
                    fontSize: props.fontSize ?? '16px',
                    fontWeight: '600',
                }}
                onClick={() => {}}
            >
                {props.title}
            </Typography>
        </Box>
    );
};

export default CustomHoverTypography;
