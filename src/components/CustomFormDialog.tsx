import { Box, Typography } from '@mui/material';

const CustomFormDialog = () => {
   return (
      <>
         <Box
            sx={{
               maxWidth: '50vw',
               maxHeight: '50vh',
               display: 'flex',
               justifyContent: 'space-around',
               bgcolor: 'red',
            }}
         >
            <Typography>NADA</Typography>
         </Box>
         <Box
            sx={{
               maxWidth: '50vw',
               maxHeight: '50vh',
               display: 'flex',
               justifyContent: 'space-around',
               bgcolor: 'blue',
               flexDirection: 'column',
            }}
         >
            <Typography>Nada</Typography>
         </Box>
      </>
   );
};

export default CustomFormDialog;
