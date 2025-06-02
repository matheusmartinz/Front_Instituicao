import React from "react"
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const onNavigateEscola = () => {
        navigate("/escola")
    }


    return (
      <>
 <Typography variant="h3" sx={{
    color: "red"
 }}>
        Estou no HOME
      </Typography>

      <Button 
      onClick={onNavigateEscola}
      >
             <Typography variant="h3" color="primary">
        Ir para a escola
      </Typography>
      </Button>
      </>
    );
  };

  export default Home