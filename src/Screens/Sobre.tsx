import Box from '@mui/material/Box';
import { useState } from 'react';
import CustomButton from '../components/CustomButton';
import CustomTypography from '../components/CustomTypography';
import { TipoTelaHome } from '../types';
import Home from './Home';

const initialState = {
    TipoTelaSobre: TipoTelaHome.SOBRE,
};

const Sobre = () => {
    const [stateLocal, setStateLocal] = useState(initialState);

    const onNavigateHome = () => {
        setStateLocal(prevState => ({
            ...prevState,
            TipoTelaSobre: TipoTelaHome.HOME,
        }));
    };
    return (
        <>
            {stateLocal.TipoTelaSobre === TipoTelaHome.SOBRE && (
                <>
                    <Box sx={{ marginLeft: '12px', paddingTop: '12px' }}>
                        <CustomButton title="VOLTAR" onClick={onNavigateHome} />
                    </Box>
                    <Box
                        sx={{
                            maxWidth: '70%',
                            marginLeft: '20%',
                            marginTop: '20px',
                            display: 'flex',
                            gap: '10px',
                        }}
                    >
                        <CustomTypography
                            color="black"
                            title="Há mais de 37 anos, nós da Escola Notre Dame, nos preocupamos não só com os aspectos pedagógicos da educação, mas também com a formação pessoal do aluno. Por isso, aprimoramos constantemente nossas ferramentas de ensino acompanhando as mais valiosas tendências mundiais. Nossa área verde é um diferencial que oferece aos alunos maior contato com a natureza e momentos únicos de socialização com aulas ao ar livre. Os investimentos em tecnologia VR (Realidade Virtual) e impressoras 3D proporcionam experiências únicas e uma verdadeira imersão no conteúdo. Nossa equipe de profissionais está, sempre disponível para atender pais e alunos. Isso faz parte do cuidado especial que temos para cada aluno: acreditamos que a escola pode ajudá-los a crescer sadios, eficazes e felizes, protagonistas e agentes transformadores do futuro. Esse é o nosso jeito de ensinar: incentivar cada um a desenvolver as competências que quiserem, sem impor padrões, porque cada criança, cada adolescente é capaz de construir sua própria história de sucesso. "
                            noFontWeight
                            letterSpacing
                        />
                        <img
                            src="https://cangurunews.com.br/wp-content/uploads/2022/05/escola-criancas-prejuizos.jpg"
                            alt=""
                            style={{
                                height: '30%',
                                minWidth: '45%',
                                maxWidth: '45%',
                                marginTop: '10%',
                            }}
                        />
                    </Box>
                </>
            )}
            {stateLocal.TipoTelaSobre === TipoTelaHome.HOME && <Home />}
        </>
    );
};

export default Sobre;
