import { Button, Typography } from '@mui/material';

export type TButtonGeneric = {
    color?: string;
    bgcolor?: string;
    onClick: () => void;
    title: string;
    borderRadius: string | undefined;
    padding?: string;
    marginRight?: string;
};

const CustomButton = (props: TButtonGeneric) => {
    return (
        <Button
            onClick={props.onClick}
            sx={{
                bgcolor: props.bgcolor ?? 'purple',
                borderRadius: props.borderRadius,
                padding: props.padding,
                marginRight: props.marginRight,
            }}
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    color: props.color ?? 'white',
                }}
            >
                {props.title}
            </Typography>
        </Button>
    );
};

export default CustomButton;
