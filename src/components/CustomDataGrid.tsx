import { Paper } from '@mui/material';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { TCustomDataGrid } from '../types';

const CustomDataGrid = <T extends GridValidRowModel>(props: TCustomDataGrid<T>) => {
      return (
            <Paper sx={{ height: 450, width: '97%', marginLeft: '20px' }}>
                  <DataGrid
                        rows={props.rows}
                        getRowId={props.getRowId}
                        columns={props.columns}
                        initialState={{
                              pagination: {
                                    paginationModel: { pageSize: 25 },
                              },
                        }}
                        pageSizeOptions={[15, 25, 50, 100]}
                        sx={{ border: 0 }}
                        loading={props.loading}
                        slotProps={{
                              loadingOverlay: {
                                    variant: 'circular-progress',
                                    noRowsVariant: 'circular-progress',
                              },
                        }}
                        localeText={{
                              ...ptBR.components.MuiDataGrid.defaultProps.localeText,
                              noRowsLabel: props.noRowsLabel,
                        }}
                  />
            </Paper>
      );
};

export default CustomDataGrid;
