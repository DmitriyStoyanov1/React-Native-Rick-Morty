import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';
import {Filter} from '../../components';

const PAGE_SIZE = 20;

const FILTER_OPTIONS = {
  type: [
    {label: 'All', value: 'all'},
    {
      label: 'Planet',
      value: 'planet',
    },
    {
      label: 'Cluster',
      value: 'cluster',
    },
    {
      label: 'Space station',
      value: 'space station',
    },
    {
      label: 'Microverse',
      value: 'microverse',
    },
    {
      label: 'TV',
      value: 'tv',
    },
    {
      label: 'Resort',
      value: 'resort',
    },
    {
      label: 'Fantasy town',
      value: 'fantasy town',
    },
    {
      label: 'Dream',
      value: 'dream',
    },
    {
      label: 'Dimension',
      value: 'dimension',
    },
    {
      label: 'unknown',
      value: 'unknown',
    },
    {
      label: 'Menagerie',
      value: 'menagerie',
    },
    {
      label: 'Game',
      value: 'game',
    },
    {
      label: 'Customs',
      value: 'customs',
    },
    {
      label: 'Daycare',
      value: 'daycare',
    },
    {
      label: 'Dwarf planet (Celestial Dwarf)',
      value: 'dwarf planet (celestial dwarf)',
    },
    {
      label: 'Miniverse',
      value: 'miniverse',
    },
    {
      label: 'Teenyverse',
      value: 'teenyverse',
    },
    {
      label: 'Box',
      value: 'box',
    },
    {
      label: 'Spacecraft',
      value: 'spacecraft',
    },
    {
      label: 'Artificially generated world',
      value: 'artificially generated world',
    },
    {
      label: 'Machine',
      value: 'machine',
    },
    {
      label: 'Arcade',
      value: 'arcade',
    },
    {
      label: 'Spa',
      value: 'spa',
    },
    {
      label: 'Quadrant',
      value: 'quadrant',
    },
    {
      label: 'Quasar',
      value: 'quasar',
    },
    {
      label: 'Mount',
      value: 'mount',
    },
    {
      label: 'Liquid',
      value: 'liquid',
    },
    {
      label: 'Convention',
      value: 'convention',
    },
    {
      label: 'Woods',
      value: 'woods',
    },
    {
      label: 'Diegesis',
      value: 'diegesis',
    },
    {
      label: 'Non-Diegetic Alternative Reality',
      value: 'non-diegetic alternative reality',
    },
    {
      label: 'Nightmare',
      value: 'nightmare',
    },
    {
      label: 'Asteroid',
      value: 'asteroid',
    },
    {
      label: 'Acid Plant',
      value: 'acid plant',
    },
    {
      label: 'Reality',
      value: 'reality',
    },
    {
      label: 'Death Star',
      value: 'death star',
    },
    {
      label: 'Base',
      value: 'base',
    },
  ],
  dimension: [
    {label: 'All', value: 'all'},
    {
      label: 'Dimension C-137',
      value: 'dimension c-137',
    },
    {
      label: 'unknown',
      value: 'unknown',
    },
    {
      label: 'Post-Apocalyptic Dimension',
      value: 'post-apocalyptic dimension',
    },
    {
      label: 'Replacement Dimension',
      value: 'replacement dimension',
    },
    {
      label: 'Cronenberg Dimension',
      value: 'cronenberg dimension',
    },
    {
      label: 'Fantasy Dimension',
      value: 'fantasy dimension',
    },
    {
      label: 'Dimension 5-126',
      value: 'dimension 5-126',
    },
    {
      label: 'Testicle Monster Dimension',
      value: 'testicle monster dimension',
    },
    {
      label: 'Cromulon Dimension',
      value: 'cromulon dimension',
    },
    {
      label: 'Dimension C-500A',
      value: 'dimension c-500a',
    },
    {
      label: 'Dimension K-83',
      value: 'dimension k-83',
    },
    {
      label: 'Dimension J19ζ7',
      value: 'dimension j19ζ7',
    },
    {
      label: 'Eric Stoltz Mask Dimension',
      value: 'eric stoltz mask dimension',
    },
    {
      label: "Evil Rick's Target Dimension",
      value: "evil rick's target dimension",
    },
    {
      label: 'Giant Telepathic Spiders Dimension',
      value: 'giant telepathic spiders dimension',
    },
    {
      label: 'Unknown dimension',
      value: 'unknown dimension',
    },
    {
      label: 'Dimension K-22',
      value: 'dimension k-22',
    },
    {
      label: 'Dimension D-99',
      value: 'dimension d-99',
    },
    {
      label: 'Dimension D716',
      value: 'dimension d716',
    },
    {
      label: 'Dimension D716-B',
      value: 'dimension d716-b',
    },
    {
      label: 'Dimension D716-C',
      value: 'dimension d716-c',
    },
    {
      label: 'Dimension J-22',
      value: 'dimension j-22',
    },
    {
      label: 'Dimension C-35',
      value: 'dimension c-35',
    },
    {
      label: 'Pizza Dimension',
      value: 'pizza dimension',
    },
    {
      label: 'Phone Dimension',
      value: 'phone dimension',
    },
    {
      label: 'Chair Dimension',
      value: 'chair dimension',
    },
    {
      label: 'Fascist Dimension',
      value: 'fascist dimension',
    },
    {
      label: 'Fascist Shrimp Dimension',
      value: 'fascist shrimp dimension',
    },
    {
      label: 'Fascist Teddy Bear Dimension',
      value: 'fascist teddy bear dimension',
    },
    {
      label: 'Wasp Dimension',
      value: 'wasp dimension',
    },
    {
      label: 'Tusk Dimension',
      value: 'tusk dimension',
    },
    {
      label: 'Magic Dimension',
      value: 'magic dimension',
    },
    {
      label: 'Merged Dimension',
      value: 'merged dimension',
    },
  ],
};

const useLocations = filter => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataOver, setIsDataOver] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState([]);

  const buildFilterQueryParams = filterObject =>
    Object.entries(filterObject)
      .filter(([_, value]) => value !== 'all')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

  const fetchLocations = async () => {
    let baseUrl = 'https://rickandmortyapi.com/api/location?';

    if (buildFilterQueryParams(filter)) {
      baseUrl += buildFilterQueryParams(filter);
    }

    if (currentPage) {
      baseUrl += buildFilterQueryParams(filter)
        ? `&page=${currentPage}`
        : `page=${currentPage}`;
    }

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

      setLocations(prevLocations => {
        const newLocations = results.filter(item =>
          prevLocations.every(char => char.id !== item.id),
        );
        return [...prevLocations, ...newLocations];
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const resetPages = () => {
    setCurrentPage(1);
  };

  const fetchLocationsOnSubmit = () => {
    setLocations([]);
    setIsDataOver(false);

    fetchLocations();
  };

  const fetchNextPage = () => {
    fetchLocations();
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetPages();
  }, [filter]);

  return {
    isLoading,
    isDataOver,

    locations,

    // methods
    fetchNextPage,
    fetchLocationsOnSubmit,
  };
};

export function LocationsPage() {
  const [filter, setFilter] = useState({
    type: 'all',
    dimension: 'all',
  });

  const {
    isLoading,
    isDataOver,

    locations,

    fetchNextPage,
    fetchLocationsOnSubmit,
  } = useLocations(filter);

  const handleFilterChange = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleEndReached = () => {
    if (isDataOver || PAGE_SIZE < locations.length) {
      return;
    }

    fetchNextPage();
  };

  const handleFilterSubmit = () => {
    fetchLocationsOnSubmit();
  };

  const getItem = (data, index) => {
    return {
      url: data[index].url,
      id: data[index].id,
      name: data[index].name,
      type: data[index].type,
      dimension: data[index].dimension,
    };
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={[styles.title, styles.id]}>{item.id}</Text>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.type}</Text>
      <Text style={styles.title}>{item.dimension}</Text>
    </View>
  );

  const renderFooter = () => {
    if (isDataOver) {
      return null;
    }

    return isLoading ? (
      <View style={styles.preloaderWrapper}>
        <ActivityIndicator large style={styles.preloader} color="#ffffff" />
      </View>
    ) : null;
  };

  const getItemCount = () => locations.length;

  return (
    <View style={styles.container}>
      <Filter
        filter={filter}
        filterOptions={FILTER_OPTIONS}
        onFilterChange={handleFilterChange}
        onFilterAction={handleFilterSubmit}
      />

      <View style={styles.titles}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.label}>Dimension</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <VirtualizedList
          data={locations}
          initialNumToRender={locations.length}
          onEndReached={handleEndReached}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          keyExtractor={item => item.url}
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
    flex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  title: {
    fontSize: 12,
    width: '25%',
    paddingLeft: 20,
  },
  id: {
    width: '10%',
  },
  titles: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  label: {
    fontSize: 20,
  },
});
