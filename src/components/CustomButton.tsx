import { Theme } from '@emotion/react';
import { Button, SxProps } from '@mui/material';
import CustomTypography from './CustomTypography';

export type TCustomButton = {
    color?: string;
    //eslint-disable-next-line
    onClick?: () => void;
    title?: string;
    sx?: SxProps<Theme>;
    // eslint-disable-next-line no-undef
    children?: React.ReactNode;
    type?: 'submit' | 'button';
};

const CustomButton = (props: TCustomButton) => {
    const sxArray = Array.isArray(props.sx) ? props.sx : [props.sx].filter(Boolean);

    return (
        <Button
            type={props.type || 'button'}
            onClick={props.onClick}
            sx={[
                {
                    bgcolor: 'purple',
                    display: 'flex',
                },
                ...sxArray,
            ]}
            variant="contained"
        >
            {props.children}
            {props.title && (
                <CustomTypography
                    color={props.color}
                    title={props.title}
                    hasIcon={!!props.children}
                />
            )}
        </Button>
    );
};

export default CustomButton;
