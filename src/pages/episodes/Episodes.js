import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const COLUMNS = [
  {field: 'id', headerName: 'ID', width: 100},
  {field: 'name', headerName: 'Name', width: 250},
  {field: 'air_date', headerName: 'Air Date', width: 250},
  {field: 'episode', headerName: 'Episode', width: 250},
];

export function EpisodesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataOver, setIsDataOver] = useState(false);
  const [episodesInfo, setEpisodesInfo] = useState(null);
  const [episodesRows, setEpisodesRows] = useState([]);

  const fetchEpisodes = async () => {
    let baseUrl = `https://rickandmortyapi.com/api/episode?`;

    // if (currentPage) {
    //   // baseUrl += buildFilterQueryParams(filter)
    //     ? `&page=${currentPage}`
    //     : `page=${currentPage}`;
    // }
    const episodesRequest = await fetch(baseUrl);
    const data = await episodesRequest.json();

    const rows = data.results.map(episodeItem => ({
      id: episodeItem.id,
      name: episodeItem.name,
      air_date: episodeItem.air_date,
      episode: episodeItem.episode,
    }));

    setEpisodesInfo(data.info);
    setEpisodesRows(rows);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleFetchEpisodes = page => {
    fetchEpisodes(page + 1);
  };

  const renderItem = item => (
    <View key={item.id}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.air_date}</Text>
      <Text>{item.episode}</Text>
    </View>
  );

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.preloaderWrapper}>
        <ActivityIndicator large style={styles.preloader} color="#ffffff" />
      </View>
    ) : null;
  };

  const getItemCount = () => episodesRows.length;

  const getItem = (data, index) => {
    return {
      name: data[index].name,
      air_date: data[index].air_date,
      id: data[index].id,
      episode: data[index].episode,
    };
  };
  // const handleEndReached = () => {
  //   if (isDataOver) {
  //     return;
  //   }

  //   fetchCharaters();
  // };

  return (
    <View style={styles.container}>
      {episodesRows.length ? (
        <SafeAreaView style={styles.container}>
          <VirtualizedList
            data={episodesRows}
            initialNumToRender={episodesRows.length}
            onEndReached={handleFetchEpisodes}
            renderItem={({item}) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.title}>{item.id}</Text>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.title}>{item.air_date}</Text>
                  <Text style={styles.title}>{item.episode}</Text>
                </View>
              );
            }}
            ListFooterComponent={renderFooter}
            keyExtractor={item => item.url}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </SafeAreaView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdaecc',
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  card: {
    display: 'flex',
    backgroundColor: '#fff',
    height: 280,
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
    paddingLeft: 20,
  },
});
