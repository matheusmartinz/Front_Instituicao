import { Box, Drawer } from '@mui/material';
import CustomTypography from '../CustomTypography';

export type TCustomLoginDrawer = {
    drawer: boolean;
    onClose: () => void;
    text1?: string;
    text2?: string;
    imageUser: string;
};

const CustomLoginDrawer = (props: TCustomLoginDrawer) => {
    return (
        <>
            <Drawer anchor="right" open={props.drawer} onClose={props.onClose}>
                <Box sx={{ width: 250, padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            style={{ width: '35%', paddingBottom: '20px' }}
                            src={props.imageUser}
                        />
                    </Box>
                    <Box
                        sx={{
                            height: '35%',
                            justifyContent: 'space-between',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CustomTypography title={props.text1} color="black" fontSize="13px" />
                        <CustomTypography title={props.text2} color="black" fontSize="12px" />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};
export default CustomLoginDrawer;
