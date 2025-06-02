import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export type TGenericSelect = {
    title: string;
    value: any;
    onChange: (event: any) => void;
    options: Array<any>;
    width?: string;
};

const GenericSelect = (props: TGenericSelect) => {
    return (
        <FormControl
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
            >
                {props.options.map((option) => {
                    return (
                        <MenuItem
                            value={
                                typeof option === 'string'
                                    ? option
                                    : option.uuid
                            }
                        >
                            {typeof option === 'string'
                                ? option
                                : option.descricao}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
export default GenericSelect;
