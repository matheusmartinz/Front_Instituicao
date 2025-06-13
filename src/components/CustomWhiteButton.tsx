import { Theme } from '@emotion/react';
import { Button, SxProps } from '@mui/material';
import CustomIcon from './CustomIcon';
import CustomTypography from './CustomTypography';

export type TCustomWhiteButton = {
    // eslint-disable-next-line no-undef
    children?: React.ReactNode;
    icon?: string;
    title?: string;

    sx?: SxProps<Theme>;
    onClick?: () => void;
    fontSize?: string;
};

const CustomWhiteButton = (props: TCustomWhiteButton) => {
    const sxArray = Array.isArray(props.sx)
        ? props.sx
        : [props.sx].filter(Boolean);
    return (
        <>
            {!props.icon && (
                <Button
                    sx={[
                        {
                            bgcolor: 'white',
                            height: '40px',
                            transition:
                                'transform 0.3s ease, color 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        },
                        ...sxArray,
                    ]}
                >
                    <CustomTypography
                        title={props.title ?? '?'}
                        color="#000"
                        fontSize={props.fontSize}
                    />
                </Button>
            )}
            {props.children}
            {props.icon && (
                <CustomIcon
                    id={''}
                    className={props.icon}
                    fontSize="35px"
                    marginLeft="20px"
                    onClick={props.onClick}
                    cursor="pointer"
                />
            )}
        </>
    );
};

export default CustomWhiteButton;
