import { movies } from '@/data/movie';

import {Pressable, Text, ScrollView, StyleSheet, View, Image, } from 'react-native';

import { useRouter } from 'expo-router';

export default function Produtos() {

  const router = useRouter();

  const filteredMovies = movies;

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >

        {filteredMovies.map((movie) => (

          <Pressable
            key={movie.id}
            style={styles.filmes}
            onPress={() =>
              router.push({
                pathname: '/movies/[id]',
                params: {
                  id: movie.id.toString()
                },
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

  scroll: {
    flex: 1,
    margin: 30,
    borderRadius: 15,
    backgroundColor: '#2f1746',
  },

  container: {
    padding: 20,
    gap: 15,
  },

  filmes: {
    backgroundColor: '#7942ac',
    width: '100%',
    minHeight: 130,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 20,
  },

  imagem: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },

  informacoes: {
    flex: 1,
    marginLeft: 20,
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