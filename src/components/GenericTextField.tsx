import { FormControl, TextField, Typography } from '@mui/material';

export type TGenericTextField = {
    label: string;
    type?: React.HTMLInputTypeAttribute;
    value: any;
    onChange: (event: any) => void;
    error: boolean;
    errorMessage: string;
    width?: string;
};

const GenericTextField = (props: TGenericTextField) => {
    return (
        <FormControl
            sx={{ width: props.width ?? '100%', marginTop: '10px' }}
        >
            <TextField
                label={props.label}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                error={props.error}
            />
            {props.error && (
                <Typography className="error">
                    {props.errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};

export default GenericTextField;
