import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import SalaService from '../api/services/sala.service';
import CustomDataGrid from '../components/CustomDataGrid';
import CustomDrawer from '../components/CustomDrawer';
import { SalaDataGridDTO } from '../types';

const initialState = {
    salas: [] as Array<SalaDataGridDTO>,
};

const Sala = () => {
    const [stateLocal, setStateLocal] = useState(initialState);
    const salaService = SalaService();

    useEffect(() => {
        getSalas();
        //eslint-disable-next-line
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'numeroSala',
            headerName: 'Numero Sala',
            width: 110,
            headerAlign: 'left',
        },
        {
            field: 'serieAno',
            headerName: 'Serie Ano',
            width: 85,
            headerAlign: 'left',
        },
        {
            field: 'capacidadeAlunos',
            headerName: 'Capacidade Alunos',
            width: 145,
            headerAlign: 'left',
        },
        {
            field: 'alunos',
            headerName: 'Quantidade Alunos',
            width: 150,
            headerAlign: 'left',
        },
        {
            field: 'professores',
            headerName: 'Quantidade Professores',
            width: 178,
            headerAlign: 'left',
        },
        {
            field: 'tarefas',
            headerName: 'Quantidade Tarefas',
            width: 150,
            headerAlign: 'left',
        },
    ];

    const getSalas = useCallback(async () => {
        try {
            const { data } = await salaService.getSalas();
            setStateLocal((prevState) => ({
                ...prevState,
                salas: data,
            }));
        } catch (err) {
            alert(err);
        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Box sx={{ marginLeft: '10px' }}>
                <CustomDrawer />
            </Box>

            <Box sx={{ marginTop: '50px', padding: '10px' }}>
                <CustomDataGrid<SalaDataGridDTO>
                    rows={stateLocal.salas}
                    columns={columns}
                    loading={false}
                    getRowId={(row: SalaDataGridDTO) => row.uuid}
                    noRowsLabel={'Não foi possível carregar as salas.'}
                />
            </Box>
        </>
    );
};

export default Sala;
