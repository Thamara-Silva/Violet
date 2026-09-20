import { movies } from '@/data/movie';

import {
  useLocalSearchParams,
  useRouter
} from 'expo-router';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';

export default function MovieDetail() {

  const { id } = useLocalSearchParams();

  const router = useRouter();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  const [sessaoSelecionada, setSessaoSelecionada] =
    useState<string | null>(null);

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <View style={styles.container}>
          <Text style={styles.erro}>Filme não encontrado.</Text>
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

        <View style={styles.filme}>

          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            android_ripple={{ color: '#c89de9', borderless: true }}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>

          <Text style={styles.titulo}>
            {movie.name}
          </Text>

          <Image
            source={movie.image}
            style={styles.imagem}
          />

          <View style={styles.informacoes}>

            <Text style={styles.subtitulo}>
              Sinopse
            </Text>

            <Text style={styles.descricao}>
              {movie.description}
            </Text>

            <View style={styles.tituloSessaoContainer}>
              <Ionicons name="time-outline" size={18} color="#c89de9" />
              <Text style={styles.tituloSessao}>
                Escolha uma sessão
              </Text>
            </View>

            <View style={styles.sessoes}>

              {movie.sessoes.map((sessao) => {

                const selecionada = sessaoSelecionada === sessao;

                return (
                  <Pressable
                    key={sessao}
                    style={[
                      styles.sessao,
                      selecionada && styles.sessaoSelecionada,
                    ]}
                    onPress={() => setSessaoSelecionada(sessao)}
                    android_ripple={{ color: '#c89de9' }}
                  >
                    {selecionada && (
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#c89de9"
                      />
                    )}
                    <Text
                      style={[
                        styles.textoSessao,
                        selecionada && styles.textoSessaoSelecionada,
                      ]}
                    >
                      {sessao}
                    </Text>
                  </Pressable>
                );

              })}

            </View>

            {!sessaoSelecionada && (
              <Text style={styles.aviso}>
                Selecione uma sessão para continuar
              </Text>
            )}

            {sessaoSelecionada && (
              <Pressable
                style={styles.botao}
                onPress={() =>
                  router.push(
                    `/ingressos?id=${movie.id}&sessao=${sessaoSelecionada}`
                  )
                }
                android_ripple={{ color: '#c89de9' }}
              >
                <Text style={styles.textoBotao}>
                  Ir para ingressos
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#2b004d" />
              </Pressable>
            )}

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  fundo: {
    backgroundColor: '#2f1746',
    flex: 1,
    paddingTop: 10,
  },

  container: {
    backgroundColor: '#7942ac',
    margin: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#c89de9',
    elevation: 10,
  },

  conteudo: {
    padding: 20,
  },

  filme: {
    alignItems: 'center',
  },

 
  botaoVoltar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#2b004d',
    borderWidth: 1,
    borderColor: '#c89de9',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  imagem: {
    width: 220,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c89de9',
    marginBottom: 20,
  },

  informacoes: {
    width: '100%',
    alignItems: 'center',
  },

  subtitulo: {
    color: '#c89de9',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  descricao: {
    color: '#f0e5ff',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  tituloSessaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
    marginBottom: 16,
  },

  tituloSessao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  sessoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },

  
  sessao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2b004d',
    borderWidth: 1,
    borderColor: '#c89de9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  sessaoSelecionada: {
    backgroundColor: '#c89de9',
    borderColor: '#fff',
  },

  textoSessao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  textoSessaoSelecionada: {
    color: '#2b004d',
  },

  
  aviso: {
    color: '#c89de9',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 4,
  },

  
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#c89de9',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  textoBotao: {
    color: '#2b004d',
    fontSize: 15,
    fontWeight: 'bold',
  },

  erro: {
    color: '#e6d2f5',
    fontSize: 18,
    textAlign: 'center',
    padding: 50,
  },

});