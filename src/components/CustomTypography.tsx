import { Typography } from '@mui/material';
import { TCustomTypographyProps } from '../types';

const CustomTypography = (props: TCustomTypographyProps) => {
    return (
        <Typography
            component={'abbr'}
            className={props.className}
            onClick={props.onClick}
            sx={{
                fontWeight: props.noFontWeight ? undefined : 'bold',
                color: props.color ?? 'white',
                textTransform: 'none',
                paddingLeft: props.hasIcon ? '10px' : undefined,
                fontSize: props.fontSize ?? undefined,
                marginTop: props.marginTop ?? undefined,
                marginLeft: props.marginLeft ?? undefined,
                width: props.width ?? undefined,
                cursor: props.cursor ?? undefined,
                userSelect: 'none',
                textDecoration: props.textDecoration,
                textAlign: props.letterSpacing ? 'justify' : undefined,
                letterSpacing: props.letterSpacing ? 2 : 0,
                textIndent: props.letterSpacing ? '50px' : undefined,
            }}
        >
            {props.title}
        </Typography>
    );
};

export default CustomTypography;
