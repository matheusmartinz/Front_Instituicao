import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    '*': {
                        margin: 0,
                        padding: 0,
                        border: 0,
                        boxSizing: 'border-box',
                    },
                    'html, body, #root': {
                        height: '100%',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        backgroundColor: '#f5f5f5',
                    },
                    '.MuiDataGrid-root *:focus': {
                        outline: 'none !important',
                        boxShadow: 'none !important',
                        userSelect: 'none !important',
                    },
                }}
            />
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default App;
