import { Typography } from '@mui/material';
import { TCustomTypographyProps } from '../types';

const CustomTypography = (props: TCustomTypographyProps) => {
    return (
        <Typography
            className={props.className}
            sx={{
                fontWeight: props.noFontWeight ? undefined : 'bold',
                color: props.color ?? 'white',
                textTransform: 'none',
                paddingLeft: props.hasIcon ? '10px' : undefined,
                fontSize: props.fontSize ?? undefined,
                marginTop: props.marginTop ?? undefined,
                marginLeft: props.marginLeft ?? undefined,
            }}
        >
            {props.title}
        </Typography>
    );
};

export default CustomTypography;
