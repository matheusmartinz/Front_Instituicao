import { useNavigate } from 'react-router-dom';
import CustomDrawer from '../components/CustomDrawer';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <CustomDrawer />
        </>
    );
};

export default Home;
