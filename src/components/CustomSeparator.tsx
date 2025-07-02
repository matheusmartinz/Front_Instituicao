import { Box } from '@mui/material';
import { memo } from 'react';

export type TCustomSeparatorProps = {
    mudaCor: boolean;
    index: string;
};

const CustomSeparator = (props: TCustomSeparatorProps) => {
    console.log(props.index);
    return (
        <Box
            sx={{
                border: `1px solid ${props.mudaCor ? 'red' : '#292929'} `,
                borderLeft: 'none',
                borderRight: 'none',
                marginTop: '20px',
                width: '94%',
                marginLeft: '23px',
            }}
        />
    );
};

export default memo(CustomSeparator);
