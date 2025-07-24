import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LoginService from '../api/services/login.service';
import { TipoTelaHome } from '../types';

const initialState = {
   tipoTela: TipoTelaHome.PERFIL,
   usuario: {
      nome: '' as string,
      login: '' as string,
      senha: '' as string,
      uuid: null as null | string,
   },
};

const Perfil = () => {
   const [stateLocal, setStateLocal] = useState(initialState);
   const loginService = LoginService();
   useEffect(() => {}, []);
   return (
      <>
         <Typography sx={{ color: 'black' }}>TESTE</Typography>
      </>
   );
};

export default Perfil;
