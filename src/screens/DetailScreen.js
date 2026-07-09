import { useEffect, useState, useRef } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  Alert, Animated, StyleSheet
} from 'react-native';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function DetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const API_KEY = '1caf27335cc24c504ab61bf1fb5e5c75';
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [movieId]);

  const addToWatchlist = async () => {
    try {
      const q = query(collection(db, 'watchlist'), where('movieId', '==', movieId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        Alert.alert('Aviso', 'Este filme já está na sua Watchlist!');
        return;
      }
      await addDoc(collection(db, 'watchlist'), {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        overview: movie.overview,
        releaseDate: movie.release_date,
        userRating: 0,
        userReview: ''
      });
      Alert.alert('Sucesso', 'Filme adicionado à Watchlist!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', `Não foi possível adicionar: ${error.message}`);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();

    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.info}>
        ⭐ Nota: {movie.vote_average} | 📅 Lançamento: {movie.release_date}
      </Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Animated.View style={{
          backgroundColor: colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#e94560', '#4CAF50']
          }),
          padding: 14,
          borderRadius: 30,
          marginTop: 20,
          marginBottom: 30,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        }}>
          <TouchableOpacity
            onPress={() => {
              animateButton();
              addToWatchlist();
            }}
            style={{ width: '100%' }}
          >
            <Text style={styles.buttonText}>+ Adicionar à Watchlist</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#16213e',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213e',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#2a2a4a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#fff',
  },
  info: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    color: '#ddd',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});