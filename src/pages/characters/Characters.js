import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  VirtualizedList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Filter} from '../../components';

export function CharactersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataOver, setIsDataOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [isCharacterModalOpened, setIsCharacterModalOpened] = useState(false);

  const [character, setCharacter] = useState([]);

  const [filter, setFilter] = useState({
    gender: 'all',
    species: 'all',
    status: 'all',
  });

  const buildFilterQueryParams = filterObject =>
    Object.entries(filterObject)
      .filter(([_, value]) => value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  //fetching characters with current query params
  const fetchCharaters = async () => {
    let baseUrl = 'https://rickandmortyapi.com/api/character?';

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

      const {info, results} = data;

      if (!results) {
        setIsDataOver(true);
        return;
      }

      setCurrentPage(currentPage + 1);

      setCharacters(prevCharacters => {
        const newCharacters = results.filter(item =>
          prevCharacters.every(char => char.id !== item.id),
        );

        return [...prevCharacters, ...newCharacters];
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharaters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key, value) => {
    setCurrentPage(1);
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleFilterSubmit = () => {
    setCharacters([]);
    setIsDataOver(false);

    fetchCharaters();
  };

  const handleCharacterCardClick = async id => {
    await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
        setIsCharacterModalOpened(!isCharacterModalOpened);
      });
  };

  const handleClose = () => {
    setIsCharacterModalOpened(false);
  };

  const getItem = (data, index) => {
    return {
      name: data[index].name,
      image: data[index].image,
      id: data[index].id,
    };
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.preloaderWrapper}>
        <ActivityIndicator large style={styles.preloader} color="#ffffff" />
      </View>
    ) : null;
  };

  const handleEndReached = () => {
    if (isDataOver) {
      return;
    }

    fetchCharaters();
  };

  const getItemCount = () => characters.length;

  return (
    <View style={styles.container}>
      <Filter
        filter={filter}
        onFilterChange={handleFilterChange}
        onFilterAction={handleFilterSubmit}
      />

      {characters.length ? (
        <SafeAreaView style={styles.container}>
          <VirtualizedList
            data={characters}
            initialNumToRender={characters.length}
            onEndReached={handleEndReached}
            renderItem={({item}) => {
              return (
                <View style={styles.card}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.media}
                    resizeMode="stretch"
                  />
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.pdLeft}>Some additional description</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => handleCharacterCardClick(item.id)}>
                    <Text style={styles.textStyle}>OPEN</Text>
                  </Pressable>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCharacterModalOpened}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          handleClose();
        }}>
        {/* {character ? ( */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Avatar
                containerStyle={{width: 200, height: 200}}
                rounded
                source={{
                  uri: character.image,
                }}
                title="Remy Sharp"
              />
            </View>
            <View style={styles.textModal}>
              <Text style={styles.modalText}>Name: </Text>
              <Text>{character.name}</Text>
            </View>

            <View style={styles.textModal}>
              <Text style={styles.modalText}>Species: </Text>
              <Text>{character.species}</Text>
            </View>

            <View style={styles.textModal}>
              <Text style={styles.modalText}>Status: </Text>
              <Text>{character.status}</Text>
            </View>

            <View style={styles.textModal}>
              <Text style={styles.modalText}>Gender: </Text>
              <Text>{character.gender}</Text>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setIsCharacterModalOpened(!isCharacterModalOpened)
              }>
              <Text style={styles.textStyle}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bdaecc',
    flex: 1,
  },
  preloaderWrapper: {
    flex: 1,
    backgroundColor: '#bdaecc',
    justifyContent: 'center',
  },
  preloader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
  pdLeft: {
    paddingLeft: 20,
  },
  modalBody: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
    position: 'absolute',
    minWidth: 600,
    backgroundColor: 'pink',
    borderRadius: 6,
    padding: '10px',
  },
  modalList: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
    fontSize: 18,
  },
  modalListKey: {
    fontWeight: '700',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  media: {
    height: 150,
    width: '100%',
  },
  modalView: {
    display: 'flex',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    letterSpacing: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    fontWeight: 'bold',
  },
  textModal: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});
