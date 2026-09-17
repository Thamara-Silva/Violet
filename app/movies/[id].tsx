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
          <Text>Filme não encontrado.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={true}
      >

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

            <Text style={styles.tituloSessao}>
              Escolha uma sessão:
            </Text>

            <View style={styles.sessoes}>

              {movie.sessoes.map((sessao) => (

                <Pressable
                  key={sessao}
                  style={[
                    styles.sessao,
                    sessaoSelecionada === sessao &&
                    styles.sessaoSelecionada
                  ]}
                  onPress={() =>
                    setSessaoSelecionada(sessao)
                  }
                >

                  <Text
                    style={[
                      styles.textoSessao,
                      sessaoSelecionada === sessao &&
                      styles.textoSessaoSelecionada
                    ]}
                  >
                    {sessao}
                  </Text>

                </Pressable>

              ))}

            </View>

            {sessaoSelecionada && (

              <Pressable
                style={styles.botao}
                onPress={() =>
                  router.push(
                    `/ingressos?id=${movie.id}&sessao=${sessaoSelecionada}`
                  )
                }
              >

                <Text style={styles.textoBotao}>
                  Ir para ingressos
                </Text>

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
    backgroundColor: '#0b0712',
    flex: 1,
    paddingTop: 10,
  },

  container: {
    backgroundColor: '#2f1746',
    margin: 30,
    borderRadius: 15,
  },

  conteudo: {
    padding: 20,
  },

  filme: {
    backgroundColor: '#7942ac',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '2%',
    marginTop: '1%',
  },

  imagem: {
    width: 300,
    height: 400,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#aa8fc3',
  },

  informacoes: {
    width: '50%',
    marginTop: 30,
    alignItems: 'center',
  },

  descricao: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },

  tituloSessao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },

  sessoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },

  sessao: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },

  sessaoSelecionada: {
    backgroundColor: '#2b004d',
    borderColor: '#c89de9',
  },

  textoSessao: {
    color: '#333',
    fontWeight: 'bold',
  },

  textoSessaoSelecionada: {
    color: '#fff',
  },

  botao: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#c89de9',
    backgroundColor: '#2b004d',
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

});