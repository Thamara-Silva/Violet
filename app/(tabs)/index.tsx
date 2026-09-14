import { movies } from '@/data/movie';
import {
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Produtos() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.fundo}>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredMovies.map((movie) => (
          <Pressable
            key={movie.id}
            style={styles.filmes}
            onPress={() =>
              router.push({
                pathname: '/movies/[id]',
                params: { id: movie.id.toString() },
              })
            }
          >
            <Image
              source={movie.image}
              style={styles.imagem}
            />

            <View style={styles.informacoes}>
              <Text style={styles.titulo}>
                {movie.name}
              </Text>

              <Text style={styles.descricao}>
                {movie.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: '#0b0712',
    flex: 1,
    paddingTop: 10,
  },

  container: {
    backgroundColor: '#2f1746',
    margin: 30,
    borderRadius: 15,
    padding: 20,
    gap: 15,
  },

  filmes: {
    backgroundColor: '#7942ac',
    width: '100%',
    minHeight: 130,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 30,
  },

  imagem: {
    width: 150,
    height: 220,
    borderRadius: 10,
    margin: 0,
  },

  informacoes: {
    flex: 1,
    marginLeft: 30,
    justifyContent: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  descricao: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
});
