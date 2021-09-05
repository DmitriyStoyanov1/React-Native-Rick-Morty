import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Filter} from '../../components';

const FILTER_OPTIONS = {
  date: [
    {label: 'From older to newer', value: 'older'},
    {label: 'From newer to older', value: 'newer'},
  ]
};

const useEpisodes = filter => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataOver, setIsDataOver] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  const fetchEpisodes = async () => {
    let baseUrl = `https://rickandmortyapi.com/api/episode?page=${currentPage}`;

    try {
      setIsLoading(true);
      const response = await fetch(baseUrl);
      const data = await response.json();

      const {results} = data;

      if (!results) {
        setIsDataOver(true);
        setIsLoading(false);
        return;
      }

      setCurrentPage(currentPage + 1);

      setEpisodes(prevEpisodes => {
        const newEpisodes = results.filter(item =>
          prevEpisodes.every(char => char.id !== item.id),
        );

        return [...prevEpisodes, ...newEpisodes];
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const applyFilter = () => {
    const episodesCopy = [...episodes];

    if (filter.date === 'older') {
      episodesCopy.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    if (filter.date === 'newer') {
      episodesCopy.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    setEpisodes(episodesCopy);
  };

  const fetchNextPage = () => {
    fetchEpisodes();
  };

  useEffect(() => {
    fetchEpisodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    isDataOver,

    episodes,

    // methods
    fetchNextPage,
    applyFilter,
  };
};

export function EpisodesPage() {
  const listRef = React.useRef();

  const [filter, setFilter] = useState({
    date: 'older',
  });

  const {
    isLoading,
    isDataOver,

    episodes,

    fetchNextPage,
    applyFilter,
  } = useEpisodes(filter);

  const handleEndReached = () => {
    if (isDataOver) {
      return;
    }

    fetchNextPage();
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.id}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.air_date}</Text>
      <Text style={styles.title}>{item.episode}</Text>
    </View>
  );

  const renderFooter = () => {
    if (isDataOver) {
      return (
        <View>
          <Text>There is no data left</Text>
        </View>
      );
    }

    return isLoading ? (
      <View style={styles.preloaderWrapper}>
        <ActivityIndicator large style={styles.preloader} color="#ffffff" />
      </View>
    ) : null;
  };

  const getItemCount = () => episodes.length;

  const getItem = (data, index) => {
    return {
      name: data[index].name,
      air_date: data[index].air_date,
      id: data[index].id,
      episode: data[index].episode,
    };
  };

  const extractKey = item => item.url;

  const handleFilterChange = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleFilterSubmit = () => {
    applyFilter();
    listRef.current.scrollToIndex({index: 0});
  };

  return (
    <View style={styles.container}>
      <Filter
        filter={filter}
        filterOptions={FILTER_OPTIONS}
        onFilterChange={handleFilterChange}
        onFilterAction={handleFilterSubmit}
      />

      <SafeAreaView style={styles.container}>
        <VirtualizedList
          ref={listRef}
          data={episodes}
          initialNumToRender={episodes.length}
          onEndReached={handleEndReached}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          keyExtractor={extractKey}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </SafeAreaView>
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
