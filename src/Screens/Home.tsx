import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => {}}>
                <Typography variant="h3" color="primary">
                    Ir para a escola
                </Typography>
            </Button>
        </>
    );
};

export default Home;
