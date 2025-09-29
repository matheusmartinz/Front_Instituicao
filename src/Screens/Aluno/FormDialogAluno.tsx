import { Box } from '@mui/material';
import ImagemEditEscola from '../../assets/images/undraw_edit_escola.svg';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import CustomTextField from '../../components/CustomTextField';
import { UF } from '../../types';

export type TFormDialogAlunoProps = {
    onCloseDialog: () => void;
};

const FormDialogAluno = (props: TFormDialogAlunoProps) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2, gap: 4 }}>
                {/* COLUNA DE CAMPOS */}
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
                        label="Nome"
                        value={''}
                        onChange={() => {}}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomTextField
                        label="CNPJ"
                        value={''}
                        onChange={() => {}}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomTextField
                        label="Cidade"
                        value={''}
                        onChange={() => {}}
                        error={false}
                        errorMessage={''}
                    />
                    <CustomSelect<UF>
                        title="Estado"
                        value={''}
                        onChange={() => {}}
                        options={[]}
                        error={false}
                        errorMessage={''}
                        sx={{ width: '100%' }}
                    />
                </Box>

                {/* IMAGEM */}
                <Box sx={{ display: 'flex', width: '60%', marginBottom: '55px' }}>
                    <img
                        src={ImagemEditEscola}
                        alt="Editar escola"
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

                {/* BOTÕES */}
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
                        onClick={props.onCloseDialog}
                        title="Cancelar"
                        sx={{ borderRadius: '50px' }}
                    />
                    <CustomButton onClick={() => {}} title="Editar" sx={{ borderRadius: '50px' }} />
                </Box>
            </Box>
        </>
    );
};

export default FormDialogAluno;
