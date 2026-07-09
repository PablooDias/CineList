import { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function WatchlistScreen() {
  const [watchlist, setWatchlist] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newRating, setNewRating] = useState('');
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'watchlist'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWatchlist(data);
    });
    return unsubscribe;
  }, []);

  const handleUpdate = async (id) => {
    if (!newRating && !newReview) {
      return Alert.alert('Aviso', 'Insira uma nota ou resenha para atualizar.');
    }
    try {
      await updateDoc(doc(db, 'watchlist', id), {
        userRating: Number(newRating) || 0,
        userReview: newReview || ''
      });
      setEditingId(null);
      setNewRating('');
      setNewReview('');
      Alert.alert('Sucesso', 'Atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar.');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Remover', 'Tem certeza que deseja remover este filme?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'watchlist', id));
            Alert.alert('Removido!');
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover.');
            console.error(error);
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.posterPath}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>

        {editingId === item.id ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Nota (0-10)"
              placeholderTextColor="#888"
              value={newRating}
              onChangeText={setNewRating}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Sua resenha"
              placeholderTextColor="#888"
              value={newReview}
              onChangeText={setNewReview}
            />
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                onPress={() => handleUpdate(item.id)}
              >
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#666' }]}
                onPress={() => {
                  setEditingId(null);
                  setNewRating('');
                  setNewReview('');
                }}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>⭐ Nota: {item.userRating || 'Não avaliado'}</Text>
            <Text style={styles.infoText}>📝 Resenha: {item.userReview || 'Nenhuma'}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => {
                  setEditingId(item.id);
                  setNewRating(String(item.userRating || ''));
                  setNewReview(item.userReview || '');
                }}
              >
                <Text style={styles.edit}>✏️ Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>🗑️ Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={watchlist}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={60} color="#888" />
          <Text style={styles.emptyText}>Sua Watchlist está vazia.</Text>
          <Text style={styles.emptySub}>Adicione filmes pela aba "Explorar"!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#16213e',
    flexGrow: 1,
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
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 6,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#2a2a4a',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 16,
  },
  edit: {
    color: '#4fc3f7',
    fontWeight: '600',
    fontSize: 14,
  },
  delete: {
    color: '#ef5350',
    fontWeight: '600',
    fontSize: 14,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ccc',
  },
  emptySub: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});