
import React, { useState } from 'react';

import { movies } from '@/data/movie';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const CORES = {
  fundo: '#0b0712',
  painel: '#100b18',
  superficie: '#17101f',
  roxo: '#b14cff',
  lilas: '#d4a0ff',
  texto: '#ffffff',
  textoSecundario: '#a99bb8',
  borda: '#30213d',
};

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const router = useRouter();
  const { width } = useWindowDimensions();

  const idFilme = Array.isArray(id) ? id[0] : id;

  const movie = movies.find(
    (item) => String(item.id) === String(idFilme)
  );

  const [sessaoSelecionada, setSessaoSelecionada] =
    useState<string | null>(null);

  const larguraPainel = Math.min(width - 32, 680);
  const larguraPoster = width < 380 ? 155 : 190;
  const alturaPoster = larguraPoster * 1.36;

  if (!movie) {
    return (
      <View style={styles.fundoErro}>
        <View style={styles.cardErro}>
          <Ionicons
            name="film-outline"
            size={44}
            color={CORES.lilas}
          />

          <Text style={styles.tituloErro}>
            Filme não encontrado
          </Text>

          <Text style={styles.textoErro}>
            Não conseguimos encontrar esse filme. Volte ao catálogo
            e escolha outro título.
          </Text>

          <Pressable
            style={styles.botaoVoltarErro}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.textoBotaoErro}>
              Voltar aos filmes
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fundo}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.filme,
            { width: larguraPainel },
          ]}
        >
          {/* Cabeçalho */}
          <View style={styles.cabecalho}>
            <Pressable
              style={styles.botaoVoltar}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={CORES.texto}
              />
            </Pressable>

            <Text style={styles.rotuloCabecalho}>
              DETALHES DO FILME
            </Text>
          </View>

          {/* Poster e informações */}
          <View style={styles.destaqueFilme}>
            <Image
              source={movie.image}
              style={[
                styles.imagem,
                {
                  width: larguraPoster,
                  height: alturaPoster,
                },
              ]}
              resizeMode="cover"
            />

            <View style={styles.detalhesPoster}>
              <View style={styles.etiqueta}>
                <Ionicons
                  name="ticket-outline"
                  size={13}
                  color={CORES.lilas}
                />

                <Text style={styles.textoEtiqueta}>
                  DISPONÍVEL
                </Text>
              </View>

              <Text style={styles.titulo}>
                {movie.name}
              </Text>

              <View style={styles.linhaDecorativa} />

              <Text style={styles.textoPoster}>
                Escolha sua sessão e prepare-se para a experiência.
              </Text>
            </View>
          </View>

          {/* Sinopse */}
          <View style={styles.secao}>
            <View style={styles.tituloSecaoContainer}>
              <View style={styles.barraTitulo} />

              <Text style={styles.subtitulo}>
                Sinopse
              </Text>
            </View>

            <Text style={styles.descricao}>
              {movie.description}
            </Text>
          </View>

          {/* Sessões */}
          <View style={styles.secao}>
            <View style={styles.tituloSessaoContainer}>
              <View style={styles.iconeSessao}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={CORES.lilas}
                />
              </View>

              <View style={styles.textosSessao}>
                <Text style={styles.tituloSessao}>
                  Escolha uma sessão
                </Text>

                <Text style={styles.ajudaSessao}>
                  Selecione o horário que prefere.
                </Text>
              </View>
            </View>

            <View style={styles.sessoes}>
              {movie.sessoes.map((sessao) => {
                const selecionada =
                  sessaoSelecionada === sessao;

                return (
                  <Pressable
                    key={sessao}
                    style={[
                      styles.sessao,
                      selecionada && styles.sessaoSelecionada,
                    ]}
                    onPress={() => setSessaoSelecionada(sessao)}
                    accessibilityRole="radio"
                    accessibilityState={{
                      selected: selecionada,
                    }}
                  >
                    <Ionicons
                      name={
                        selecionada
                          ? 'checkmark-circle'
                          : 'time-outline'
                      }
                      size={16}
                      color={
                        selecionada
                          ? CORES.fundo
                          : CORES.lilas
                      }
                    />

                    <Text
                      style={[
                        styles.textoSessao,
                        selecionada &&
                          styles.textoSessaoSelecionada,
                      ]}
                    >
                      {sessao}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {!sessaoSelecionada && (
              <View style={styles.aviso}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={CORES.textoSecundario}
                />

                <Text style={styles.textoAviso}>
                  Selecione uma sessão para continuar.
                </Text>
              </View>
            )}
          </View>

          {/* Continuar */}
          <Pressable
            style={[
              styles.botao,
              !sessaoSelecionada && styles.botaoDesabilitado,
            ]}
            disabled={!sessaoSelecionada}
            onPress={() => {
              if (!sessaoSelecionada) return;

              router.push({
                pathname: '/ingressos',
                params: {
                  id: String(movie.id),
                  sessao: sessaoSelecionada,
                },
              });
            }}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotao}>
              Ir para ingressos
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={CORES.fundo}
            />
          </Pressable>

          <View style={styles.rodape}>
            <Ionicons
              name="sparkles-outline"
              size={14}
              color={CORES.roxo}
            />

            <Text style={styles.textoRodape}>
              Sua próxima experiência está no Violet+
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },

  container: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 26,
  },

  filme: {
    maxWidth: 680,
    alignSelf: 'center',
    backgroundColor: CORES.painel,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 22,
    padding: 20,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 23,
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  rotuloCabecalho: {
    color: CORES.textoSecundario,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  destaqueFilme: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginBottom: 27,
  },

  imagem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#49305e',
    backgroundColor: CORES.superficie,
  },

  detalhesPoster: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 11,
  },

  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#241530',
    borderWidth: 1,
    borderColor: '#49305e',
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  textoEtiqueta: {
    color: CORES.lilas,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  titulo: {
    color: CORES.texto,
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 29,
    flexShrink: 1,
  },

  linhaDecorativa: {
    width: 43,
    height: 3,
    borderRadius: 2,
    backgroundColor: CORES.roxo,
    marginTop: 1,
  },

  textoPoster: {
    color: CORES.textoSecundario,
    fontSize: 12,
    lineHeight: 19,
  },

  secao: {
    marginBottom: 25,
  },

  tituloSecaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  barraTitulo: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: CORES.roxo,
  },

  subtitulo: {
    color: CORES.texto,
    fontSize: 17,
    fontWeight: '800',
  },

  descricao: {
    color: CORES.textoSecundario,
    fontSize: 14,
    lineHeight: 23,
  },

  tituloSessaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 17,
  },

  iconeSessao: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textosSessao: {
    flex: 1,
    gap: 4,
  },

  tituloSessao: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '800',
  },

  ajudaSessao: {
    color: CORES.textoSecundario,
    fontSize: 12,
  },

  sessoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  sessao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  sessaoSelecionada: {
    backgroundColor: CORES.lilas,
    borderColor: CORES.lilas,
  },

  textoSessao: {
    color: CORES.texto,
    fontSize: 13,
    fontWeight: '700',
  },

  textoSessaoSelecionada: {
    color: CORES.fundo,
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 13,
  },

  textoAviso: {
    color: CORES.textoSecundario,
    fontSize: 12,
  },

  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: CORES.lilas,
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 1,
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  textoBotao: {
    color: CORES.fundo,
    fontSize: 15,
    fontWeight: '800',
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 19,
  },

  textoRodape: {
    color: CORES.textoSecundario,
    fontSize: 11,
    textAlign: 'center',
  },

  fundoErro: {
    flex: 1,
    backgroundColor: CORES.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  cardErro: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: CORES.painel,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 20,
    padding: 28,
    gap: 14,
  },

  tituloErro: {
    color: CORES.texto,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },

  textoErro: {
    color: CORES.textoSecundario,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  botaoVoltarErro: {
    backgroundColor: CORES.lilas,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 5,
  },

  textoBotaoErro: {
    color: CORES.fundo,
    fontSize: 14,
    fontWeight: '800',
  },
});
