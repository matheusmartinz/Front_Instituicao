import { SxProps, TextField, TextFieldProps, Theme } from '@mui/material';
import CustomTypography from './CustomTypography';

export type TCustomTextField = {
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    value: any;
    onChange: (event: any) => void;
    error: boolean;
    errorMessage: string;
    width?: string;
    height?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    slotProps?: TextFieldProps['slotProps'];
    sx?: SxProps<Theme>;
};

const CustomTextField = (props: TCustomTextField) => {
    const sxArray = Array.isArray(props.sx)
        ? props.sx
        : [props.sx].filter(Boolean);
    return (
        <TextField
            label={props.label}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            error={props.error}
            variant={props.variant}
            slotProps={props.slotProps}
            sx={[
                {
                    borderRadius: '20px',
                    width: '100%',
                    height: '100%',
                    bgcolor: 'gray',
                },
                ...sxArray,
            ]}
        >
            {props.error && (
                <CustomTypography
                    className="error"
                    title={props.errorMessage}
                    hasIcon={false}
                />
            )}
        </TextField>
    );
};

export default CustomTextField;
