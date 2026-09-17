import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { movies } from '@/data/movie';

export default function Ingressos() {

  const { id, sessao } = useLocalSearchParams();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  const [quantidade, setQuantidade] = useState(1);

  const preco = 25;
  const total = quantidade * preco;

  const router = useRouter();

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <Image source={require('../../assets/imgs/MorceguinhoT.png')} style={styles.logo} />
        <Text style={styles.erro}>
          Nenhum ingresso por aqui.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
      >

        <View style={styles.ingressos}>

          <Text style={styles.titulo}>
            Ingressos
          </Text>

          <Image
            source={movie.image}
            style={styles.imagem}
          />

          <Text style={styles.nomeFilme}>
            {movie.name}
          </Text>

          <Text style={styles.sessao}>
            Sessão: {sessao}
          </Text>

          <Text style={styles.tituloQuantidade}>
            Quantidade de ingressos
          </Text>

          <View style={styles.quantidade}>

            <Pressable
              style={styles.botaoQuantidade}
              onPress={() => {
                if (quantidade > 1) {
                  setQuantidade(quantidade - 1);
                }
              }}
            >
              <Text style={styles.textoQuantidade}>
                -
              </Text>
            </Pressable>

            <Text style={styles.numero}>
              {quantidade}
            </Text>

            <Pressable
              style={styles.botaoQuantidade}
              onPress={() => setQuantidade(quantidade + 1)}
            >
              <Text style={styles.textoQuantidade}>
                +
              </Text>
            </Pressable>

          </View>

          <Text style={styles.preco}>
            Ingresso: R$ {preco.toFixed(2)}
          </Text>

          <Text style={styles.total}>
            Total: R$ {total.toFixed(2)}
          </Text>

          <Pressable
            style={styles.botao}
            onPress={() =>
              router.push(
                `/pagamento?id=${movie.id}&sessao=${sessao}&quantidade=${quantidade}`
              )
            }
          >
            <Text style={styles.textoBotao}>
              Continuar
            </Text>
          </Pressable>
        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  fundo: {
    flex: 1,
    backgroundColor: '#0b0712',
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

  ingressos: {
    backgroundColor: '#7942ac',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  imagem: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  nomeFilme: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sessao: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 10,
  },

  tituloQuantidade: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
  },

  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },

  botaoQuantidade: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoQuantidade: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  numero: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  preco: {
    color: '#ddd',
    fontSize: 15,
    marginTop: 25,
  },

  total: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  botao: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#c89de9',
    borderRadius: 10,
    backgroundColor: '#2b004d',
    padding: 14,
    marginTop: 25,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  erro: {
    color: '#e6d2f5',
    fontSize: 18,
    textAlign: 'center',
    padding: 50,
  },

    logo: {
    alignSelf: 'center',
    marginTop: '10%',
    width: 250,
    height: 210,
    resizeMode: 'contain',
  },


});