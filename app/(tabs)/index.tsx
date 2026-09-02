import { movies } from '@/data/movie';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function Produtos() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.fundo}>
      <View style={styles.container}>

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
            <Text>{movie.name}</Text>
          </Pressable>
        ))}

      </View>
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
    backgroundColor: '#ffffffec',
    margin: 25,
    borderRadius: 15,
    height: '92%',
    padding: 20,
  },

  filmes: {
    backgroundColor: '#0099f967',
    margin: 30,
    width: '30%',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
});