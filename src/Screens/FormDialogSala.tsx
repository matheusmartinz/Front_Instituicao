import { Box } from "@mui/material";
import ImagemEditEscola from '../assets/images/undraw_edit_escola.svg';
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/CustomSelect";
import CustomTextField from "../components/CustomTextField";

export type TPropsFormDialogEscola = {
    onCloseDialog: () => void;
}

const FormDialogEscola = (props: TPropsFormDialogEscola) => {

    return (
    <>
                <Box sx={{ bottom: 0, display: 'flex' }}>
                        <Box
                              sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '35%',
                                    justifyContent: 'space-between',
                                    height: '260px',
                                    marginLeft: '20px',
                                    marginRight: '60px',
                              }}
                        >
                              <CustomTextField
                                    value={''}
                                    onChange={() => {}}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomTextField
                                    value={''}
                                    onChange={() => {}}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomTextField
                                    value={''}
                                    onChange={() => {}}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomSelect<''>
                                    title={''}
                                    value={''}
                                    onChange={() => {}}
                                    options={Object.values([])}
                                    error={false}
                                    errorMessage={''}
                                    sx={{ width: '100%' }}
                              />
                        </Box>
                        <Box
                              sx={{
                                    display: 'flex',
                                    position: 'absolute',
                                    justifyContent: 'space-between',
                                    width: '90%',
                                    bottom: 10,
                                    marginLeft: '5px',
                              }}
                        >
                              <CustomButton
                                    onClick={() => {}}
                                    title="Cancelar"
                                    sx={{ borderRadius: '50px' }}
                              />
                              <CustomButton
                                    onClick={() => {}}
                                    title="Editar"
                                    sx={{ borderRadius: '50px' }}
                              />
                        </Box>
                        <Box sx={{ display: 'flex', width: '60%', marginBottom: '55px' }}>
                              <img
                                    src={ImagemEditEscola}
                                    style={{
                                          maxWidth: '100%',
                                          maxHeight: '300px',
                                          objectFit: 'contain',
                                          userSelect: 'none',
                                          pointerEvents: 'none',
                                    }}
                                    draggable={false}
                              />
                        </Box>
                  </Box>
    </>
    )
}

export default FormDialogEscola;