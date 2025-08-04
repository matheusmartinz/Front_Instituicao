import { Box, Typography } from '@mui/material';
import CustomButton from 'components/CustomButton';
import CustomSelect from 'components/CustomSelect';
import CustomTextField from 'components/CustomTextField';
import { useEffect, useState } from 'react';
import { EscolaDataGridDTO, EscolaDTO, UF } from 'types';
import ImagemEditEscola from '../assets/images/undraw_edit_escola.svg';

export type TCustomFormDialogEscolaProps = {
      onClickCancelar: () => void;
      onClickEditar: () => void;
      escolaSelecionada: EscolaDataGridDTO | null;
};

const initialState = {
      escolaDTO: {
            nome: '' as string,
            endereco: {
                  cidade: '' as string,
                  cep: '' as string,
                  estado: '' as UF,
            },
      } as EscolaDTO,
};

const FormDialogEscola = (props: TCustomFormDialogEscolaProps) => {
      const [stateLocal, setStateLocal] = useState(initialState);
      const escolaSelecionada = props.escolaSelecionada;

      const formatCep = (cep: string) => {
            const digits = cep.replace(/\D/g, '');
            if (digits.length <= 5) return digits; // não formata se menor ou igual a 5 dígitos
            return digits.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
      };

      useEffect(() => {
            if (escolaSelecionada) {
                  const estado = escolaSelecionada.estado.split('-');
                  setStateLocal(prevState => ({
                        ...prevState,
                        escolaDTO: {
                              ...prevState.escolaDTO,
                              nome: escolaSelecionada.nome,
                              endereco: {
                                    ...prevState.escolaDTO.endereco,
                                    cidade: escolaSelecionada.cidade,
                                    cep: escolaSelecionada.cep,
                                    estado:
                                          UF[estado[0] as keyof typeof UF] ??
                                          prevState.escolaDTO.endereco.estado,
                              },
                        },
                  }));
            }
      }, []);

      const onChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
            setStateLocal(prevState => ({
                  ...prevState,
                  escolaDTO: {
                        ...prevState.escolaDTO,
                        nome: event.target.value,
                  },
            }));
      };

      const onChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
            setStateLocal(prevState => ({
                  ...prevState,
                  escolaDTO: {
                        ...prevState.escolaDTO,
                        endereco: {
                              ...prevState.escolaDTO.endereco,
                              cep: event.target.value,
                        },
                  },
            }));
      };

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
                                    value={stateLocal.escolaDTO.nome}
                                    onChange={onChangeNome}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomTextField
                                    value={formatCep(stateLocal.escolaDTO.endereco.cep)}
                                    onChange={onChangeCep}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomTextField
                                    value={stateLocal.escolaDTO.endereco.cidade}
                                    onChange={() => {}}
                                    error={false}
                                    errorMessage={''}
                              />
                              <CustomSelect<UF>
                                    title={''}
                                    value={stateLocal.escolaDTO.endereco.estado}
                                    onChange={() => {}}
                                    options={Object.values(UF)}
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
                                    onClick={props.onClickCancelar}
                                    title="Cancelar"
                                    sx={{ borderRadius: '50px' }}
                              />
                              <CustomButton
                                    onClick={props.onClickEditar}
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
      );
};
export default FormDialogEscola;
