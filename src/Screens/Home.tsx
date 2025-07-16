import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import CustomDrawer from "../components/CustomDrawer";
import CustomIcon from "../components/CustomIcon";
import CustomLoginDrawer from "../components/CustomLogin/CustomLoginDrawer";
import CustomTypography from "../components/CustomTypography";
import { TipoTelaHome } from "../types";
import CadastroLogin from "./CadastroLogin";
import Sobre from "./Sobre";

type Usuario = {
    nome: string;
    login: string;
};

const initialState = {
    TipoTelaHome: TipoTelaHome.HOME,
    drawer: false,
};

const Home = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        console.log("AQUI HOME", usuarioLogado);

        if (usuarioLogado) {
            try {
                const parsed = JSON.parse(usuarioLogado);
                setUsuario(parsed);
                console.log("Usuário logado:", parsed);
            } catch (err) {
                console.error("Erro ao fazer parse:", err);
            }
        }
    }, []);

    const onNavigateSobre = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            TipoTelaHome: TipoTelaHome.SOBRE,
        }));
    };

    const openDrawer = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            drawer: true,
        }));
    };

    const closeDrawer = () => {
        setStateLocal((prevState) => ({
            ...prevState,
            drawer: false,
        }));
    };

    return (
        <>
            {stateLocal.TipoTelaHome === TipoTelaHome.HOME && (
                <Box sx={{ display: "flex" }}>
                    <CustomDrawer />

                    <Box
                        sx={{
                            width: "71%",
                            flexDirection: "row",
                            display: "flex",
                            marginLeft: "71%",
                            justifyContent: "space-between",
                            marginRight: "5px",
                            marginTop: "2px",
                            height: "50px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "70%",
                                marginTop: "6px",
                                height: "40%",
                            }}
                        >
                            <CustomTypography
                                title="Sobre"
                                color="black"
                                onClick={onNavigateSobre}
                                cursor="pointer"
                            />
                            <CustomTypography title="Novidades" color="black" cursor="pointer" />
                        </Box>

                        <Box
                            sx={{
                                width: "40%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <CustomIcon
                                id=""
                                className="fas fa-user-circle"
                                padding="3px"
                                fontSize="30px"
                                marginTop="3px"
                                color="black"
                                onClick={openDrawer}
                                cursor="pointer"
                            />

                            <CustomLoginDrawer
                                onClose={closeDrawer}
                                drawer={stateLocal.drawer}
                                text1={usuario?.nome ?? "Usuário"}
                                text2={usuario?.login ?? "Email"}
                                imageUser=""
                            />
                        </Box>
                    </Box>
                </Box>
            )}

            {stateLocal.TipoTelaHome === TipoTelaHome.SOBRE && <Sobre />}
            {stateLocal.TipoTelaHome === TipoTelaHome.CADASTRO_LOGIN && <CadastroLogin />}
        </>
    );
};

export default Home;
