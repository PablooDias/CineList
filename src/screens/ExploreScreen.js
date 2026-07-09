import { useEffect, useState } from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity,
  TextInput, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPopularMovies, searchMovies } from '../services/tmdbApi';

export default function ExploreScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    setLoading(true);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os filmes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (query.trim() === '') {
      loadPopular();
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha na busca.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { movieId: item.id })}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>⭐ {item.vote_average?.toFixed(1) || 'N/A'}</Text>
        <Text style={styles.release}>{item.release_date?.split('-')[0] || 'Ano desconhecido'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filme..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#e94560" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2a2a4a',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: '#2a2a4a',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#ffd700',
    marginBottom: 2,
  },
  release: {
    fontSize: 13,
    color: '#aaa',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});