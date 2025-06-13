import { Box } from '@mui/material';
import { TLineSeparatorProps } from '../types';

const LineSeparator = (props: TLineSeparatorProps) => {
    return (
        <Box
            sx={{
                height: '30px',
                marginLeft: props.marginLeft ?? '10px',
                border: `1px solid ${props.color}`,
            }}
        />
    );
};

export default LineSeparator;
