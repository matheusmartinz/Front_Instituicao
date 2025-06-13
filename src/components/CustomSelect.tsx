import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CustomTypography from './CustomTypography';

export type TCustomSelect<T> = {
    title: string;
    value: any | string;
    onChange: (event: any) => void;
    options: Array<T>;
    width?: string;
    error: boolean;
    errorMessage: string;
};

const CustomSelect = <T,>(props: TCustomSelect<T>) => {
    return (
        <FormControl
            error={props.error}
            sx={{
                width: props.width ?? '49%',
            }}
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
                variant="standard"
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
                <CustomTypography
                    title={props.errorMessage}
                    className="error"
                    hasIcon={false}
                />
            )}
        </FormControl>
    );
};
export default CustomSelect;
