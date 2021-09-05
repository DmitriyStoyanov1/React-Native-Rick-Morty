import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import { useEffect, useState } from 'react';
// import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
// import { IApiResponseInfo, ILocationEntity } from '../../types';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       background: 'white',
//       paddingTop: theme.spacing(4),
//       paddingBottom: theme.spacing(4),
//     },
//   })
// );

// interface IGridColumn {
//   field: string;
//   headerName: string;
//   width: number;
// }

// const COLUMNS: IGridColumn[] = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'name', headerName: 'Name', width: 250 },
//   { field: 'type', headerName: 'Type', width: 250 },
//   { field: 'dimension', headerName: 'Dimension', width: 250 },
// ];

export function LocationsPage() {
  // const classes = useStyles();
  // const [locationsInfo, setLocationsInfo] = useState<IApiResponseInfo | null>(
  //   null
  // );
  // const [locationsRows, setLocationsRows] = useState<ILocationEntity[]>([]);

  // const fetchLocations = async (page?: number) => {
  //   const baseUrl = `https://rickandmortyapi.com/api/location?${
  //     page ? `page=${page}` : ''
  //   }`;

  //   const locationsRequest = await fetch(baseUrl);
  //   const data = await locationsRequest.json();

  //   const rows = data.results.map(
  //     ({ id, name, type, dimension }: ILocationEntity) => ({
  //       id,
  //       name,
  //       type,
  //       dimension,
  //     })
  //   );

  //   setLocationsInfo(data.info);
  //   setLocationsRows(rows);
  // };

  // useEffect(() => {
  //   fetchLocations();
  // }, []);

  // const handleFetchLocations = ({ page }: { page: number }) => {
  //   fetchLocations(page + 1);
  // };

  return (
    <View>
      <Text>Locations</Text>
    </View>
    // <Container maxWidth="lg" className={classes.container}>
    //   <div style={{ height: 800, width: '100%' }}>
    //     <DataGrid
    //       rows={locationsRows}
    //       columns={COLUMNS}
    //       pagination
    //       pageSize={20}
    //       paginationMode="server"
    //       rowCount={locationsInfo?.count}
    //       onPageChange={handleFetchLocations}
    //     />
    //   </div>
    // </Container>
  );
}
