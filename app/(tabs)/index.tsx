
import { movies } from '@/data/movie';
import {
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Produtos() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Ajusta a quantidade de colunas conforme a tela.
  const colunas =
    width >= 1400 ? 6 :
    width >= 1050 ? 5 :
    width >= 800 ? 4 :
    width >= 550 ? 3 : 2;

  const espacamento = 16;
  const margem = width >= 800 ? 36 : 20;
  const larguraCard =
    (width - margem * 2 - espacamento * (colunas - 1)) /
    colunas;

  // Primeiro filme como destaque principal.
  const destaque = movies[0];

  function abrirFilme(id: string | number) {
    router.push({
      pathname: '/movies/[id]',
      params: {
        id: id.toString(),
      },
    });
  }

  return (
    <View style={styles.fundo}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* DESTAQUE PRINCIPAL */}
        {destaque && (
          <View style={styles.hero}>
            <View style={styles.heroTexto}>
              <View style={styles.etiquetaDestaque}>
                <Ionicons
                  name="sparkles"
                  size={13}
                  color="#d4a0ff"
                />
                <Text style={styles.etiquetaTexto}>
                  DESTAQUE DA SEMANA
                </Text>
              </View>

              <Text style={styles.heroTitulo}>
                {destaque.name}
              </Text>

              <Text
                style={styles.heroDescricao}
                numberOfLines={5}
              >
                {destaque.description}
              </Text>

              <Pressable
                style={styles.botaoExplorar}
                onPress={() => abrirFilme(destaque.id)}
              >
                <Ionicons
                  name="ticket-outline"
                  size={18}
                  color="#ffffff"
                />
                <Text style={styles.botaoTexto}>
                  Explorar filme
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.heroPoster}
              onPress={() => abrirFilme(destaque.id)}
            >
              <Image
                source={destaque.image}
                style={styles.heroImagem}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        )}

        {/* CABEÇALHO DO CATÁLOGO */}
        <View style={styles.cabecalhoSecao}>
          <Text style={styles.subtituloSecao}>
            ESCOLHA SEU PRÓXIMO FILME
          </Text>

          <Text style={styles.tituloSecao}>
            Em cartaz
          </Text>

          <View style={styles.linhaDecorativa} />
        </View>

        {/* GRADE DE FILMES */}
        <View style={styles.gradeFilmes}>
          {movies.map((movie) => (
            <View
              key={movie.id}
              style={[
                styles.card,
                { width: larguraCard },
              ]}
            >
              <View style={styles.posterContainer}>
                <Pressable
                  style={styles.posterClicavel}
                  onPress={() => abrirFilme(movie.id)}
                >
                  <Image
                    source={movie.image}
                    style={styles.imagem}
                    resizeMode="cover"
                  />
                </Pressable>

                <Pressable
                  style={styles.botaoMais}
                  onPress={() => abrirFilme(movie.id)}
                  accessibilityLabel={
                    `Ver detalhes de ${movie.name}`
                  }
                >
                  <Ionicons
                    name="add"
                    size={23}
                    color="#ffffff"
                  />
                </Pressable>
              </View>

              <View style={styles.informacoes}>
                <Pressable
                  onPress={() => abrirFilme(movie.id)}
                >
                  <Text
                    style={styles.tituloFilme}
                    numberOfLines={2}
                  >
                    {movie.name}
                  </Text>
                </Pressable>

                <Text
                  style={styles.descricaoFilme}
                  numberOfLines={2}
                >
                  {movie.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* RODAPÉ */}
        <View style={styles.rodape}>
          <View style={styles.rodapeLinha} />
          <Text style={styles.rodapeTexto}>
            VIOLET+  •  SEU PRÓXIMO FILME ESTÁ AQUI
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#0b0712',
  },

  scroll: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 35,
  },

  // DESTAQUE PRINCIPAL

  hero: {
    backgroundColor: '#171020',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#352044',
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 36,
    overflow: 'hidden',
  },

  heroTexto: {
    flex: 1,
    justifyContent: 'center',
  },

  etiquetaDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 14,
  },

  etiquetaTexto: {
    color: '#d4a0ff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },

  heroTitulo: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 12,
  },

  heroDescricao: {
    color: '#bcb2c9',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 20,
  },

  botaoExplorar: {
    backgroundColor: '#9b3df5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 9,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },

  botaoTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },

  heroPoster: {
    width: '36%',
    maxWidth: 190,
    minWidth: 95,
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#24152f',
  },

  heroImagem: {
    width: '100%',
    height: '100%',
  },

  // CABEÇALHO DO CATÁLOGO

  cabecalhoSecao: {
    marginBottom: 22,
  },

  subtituloSecao: {
    color: '#b14cff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },

  tituloSecao: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '800',
  },

  linhaDecorativa: {
    width: 42,
    height: 3,
    backgroundColor: '#b14cff',
    borderRadius: 3,
    marginTop: 12,
  },

  // GRADE DE FILMES

  gradeFilmes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 26,
  },

  card: {
    backgroundColor: 'transparent',
  },

  posterContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#171020',
    borderWidth: 1,
    borderColor: '#352044',
    position: 'relative',
  },

  posterClicavel: {
    width: '100%',
    height: '100%',
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  botaoMais: {
    position: 'absolute',
    right: 9,
    bottom: 9,
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#9b3df5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#c78aff',
  },

  informacoes: {
    paddingTop: 11,
    paddingHorizontal: 2,
  },

  tituloFilme: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 5,
  },

  descricaoFilme: {
    color: '#92879f',
    fontSize: 11,
    lineHeight: 16,
  },

  // RODAPÉ

  rodape: {
    alignItems: 'center',
    marginTop: 40,
    gap: 15,
  },

  rodapeLinha: {
    height: 1,
    width: '100%',
    backgroundColor: '#281637',
  },

  rodapeTexto: {
    color: '#71647e',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});
