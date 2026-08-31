import { movies } from '@/data/movie';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  if (!movie) {
    return (
      <View>
        <Text>Filme não encontrado.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
    </View>
  );
}
