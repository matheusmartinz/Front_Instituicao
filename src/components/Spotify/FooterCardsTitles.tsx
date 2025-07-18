import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { globalStyles } from '../../styles/globalStyles';
import { FooterCardDTO } from '../../types';
import CustomSeparator from '../CustomSeparator';
import CustomTypography from '../CustomTypography';
import IconsFooter from '../IconsFooter';

export type TFooterCardsTitlesProps = {
   item: FooterCardDTO[];
};

const FooterCardsTitles = (props: TFooterCardsTitlesProps) => {
   const [mudaCor, setMudaCor] = useState(false);

   const usuario = useAppSelector(e => e.usuario);

   console.log('estou la na pqp', usuario);

   useEffect(() => {
      setTimeout(() => {
         setMudaCor(() => !mudaCor);
      }, 3500);
   }, [mudaCor]);

   return (
      <>
         <CustomSeparator mudaCor={mudaCor} index="primeiro" />
         <Grid
            container
            spacing={2}
            sx={{
               minHeight: '300px',
               bgcolor: globalStyles.CINZA_SPOTIFY_BACKGROUND,
               // borderTopWidth: '1px',
               // borderTopColor: 'red',
            }}
         >
            <Box
               sx={{
                  width: '100%',
                  display: 'flex',
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'row',
                     width: '70%',
                     gap: 0,
                  }}
               >
                  {props.item.map(e => {
                     return (
                        <Box sx={{ marginLeft: '45px' }}>
                           <CustomTypography title={e.title} marginTop="5px" fontSize="15px" />
                           {e.subtitles.map(el => {
                              return (
                                 <CustomTypography
                                    title={el}
                                    marginTop="10px"
                                    noFontWeight
                                    fontSize="15px"
                                    color="#b3b3b3"
                                 />
                              );
                           })}
                        </Box>
                     );
                  })}
               </Box>
               <Box
                  sx={{
                     marginLeft: '25px',
                     marginTop: '-10px',
                     padding: '20px',
                  }}
               >
                  <IconsFooter />
               </Box>
            </Box>
            <CustomSeparator mudaCor={false} index="segundo" />
            <Box
               sx={{
                  paddingBottom: '50px',
                  marginBottom: '30px',
               }}
            >
               <CustomTypography
                  title="© 2025 Spotify AB"
                  noFontWeight
                  fontSize="14px"
                  marginLeft="25px"
                  color="#b3b3b3"
               />
            </Box>
         </Grid>
      </>
   );
};

export default FooterCardsTitles;
