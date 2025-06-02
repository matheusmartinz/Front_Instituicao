import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';

export type TGenericSelect<T> = {
    title: string;
    value: any | string;
    onChange: (event: any) => void;
    options: Array<T>;
    width?: string;
    error: boolean;
    errorMessage: string;
};

const GenericSelect = <T,>(props: TGenericSelect<T>) => {
    return (
        <FormControl
            error={props.error}
            sx={{ width: props.width ?? '49%', marginTop: '10px' }}
        >
            <InputLabel id="demo-simple-select-label">
                {props.title}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={props.title}
                value={props.value}
                onChange={props.onChange}
                error={props.error}
            >
                {props.options.map((option) => {
                    if (typeof option === 'string') {
                        return (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        );
                    } else {
                        return (
                            <MenuItem
                                key={(option as any).uuid}
                                value={(option as any).uuid}
                            >
                                {(option as any).descricao}
                            </MenuItem>
                        );
                    }
                })}
            </Select>
            {props.error && (
                <Typography className="error">
                    {props.errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};
export default GenericSelect;
