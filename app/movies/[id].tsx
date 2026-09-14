import { movies } from '@/data/movie';
import { useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <View style={styles.container}>
        <Text>Filme não encontrado.</Text>
        </View>
      </View>

    );
  }

  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
          <View style={styles.filme}>

              <Text style={styles.titulo}>
                {movie.name}
              </Text>


            <Image
              source={movie.image}
              style={styles.imagem}
            />

            <View style={styles.informacoes}>

              <Text style={styles.descricao}>
                {movie.description}
              </Text>

              <Pressable key={movie.id} style={styles.sessao}>  

              </Pressable>
            </View>


          </View>
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
    backgroundColor: '#2f1746',
    margin: 30,
    borderRadius: 15,
    padding: 20,
    height:'92%',
  },

  filme: {
    backgroundColor: '#7942ac',
    width: '100%',
    height:'100%',
    borderRadius: 15,
    padding: 30,
    alignItems:'center'

  },

  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '3%',
    marginTop:'3%'
  },

    imagem: {
    width: 300,
    height: 400,
    borderRadius: 10,
    margin: 0,
  },

  informacoes: {
    flex: 1,
    justifyContent: 'center',
  },

  descricao: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },

  sessao:{
    
  }

})
