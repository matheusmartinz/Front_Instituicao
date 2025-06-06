import { Typography } from '@mui/material';
import { TCustomTypographyProps } from '../types';

const CustomTypography = (props: TCustomTypographyProps) => {
    return (
        <Typography
            className={props.className}
            sx={{
                fontWeight: 'bold',
                color: props.color ?? 'white',
                textTransform: 'none',
                paddingLeft: props.hasIcon ? '10px' : undefined,
            }}
        >
            {props.title}
        </Typography>
    );
};

export default CustomTypography;
