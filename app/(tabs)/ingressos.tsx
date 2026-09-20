import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { movies } from '@/data/movie';

const PRECO_INGRESSO = 25;
const MAX_INGRESSOS = 10;

export default function Ingressos() {

  const { id, sessao } = useLocalSearchParams();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  const [quantidade, setQuantidade] = useState(1);

  const total = quantidade * PRECO_INGRESSO;

  const router = useRouter();

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <Image
          source={require('../../assets/imgs/MorceguinhoT.png')}
          style={styles.logo}
        />
        <Text style={styles.erro}>
          Nenhum ingresso por aqui.
        </Text>
      </View>
    );
  }

  const diminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const aumentar = () => {
    if (quantidade < MAX_INGRESSOS) setQuantidade(quantidade + 1);
  };

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.ingressos}>

          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            android_ripple={{ color: '#c89de9', borderless: true }}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>

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

          <View style={styles.badgeSessao}>
            <Ionicons name="time-outline" size={14} color="#2b004d" />
            <Text style={styles.textoBadge}>
              Sessão: {sessao}
            </Text>
          </View>

          <Text style={styles.tituloQuantidade}>
            Quantidade de ingressos
          </Text>

          <View style={styles.quantidade}>

            <Pressable
              style={[
                styles.botaoQuantidade,
                quantidade === 1 && styles.botaoDesabilitado,
              ]}
              onPress={diminuir}
              disabled={quantidade === 1}
              android_ripple={{ color: '#c89de9' }}
            >
              <Ionicons
                name="remove"
                size={22}
                color={quantidade === 1 ? '#8a7aa3' : '#fff'}
              />
            </Pressable>

            <Text style={styles.numero}>
              {quantidade}
            </Text>

            <Pressable
              style={[
                styles.botaoQuantidade,
                quantidade === MAX_INGRESSOS && styles.botaoDesabilitado,
              ]}
              onPress={aumentar}
              disabled={quantidade === MAX_INGRESSOS}
              android_ripple={{ color: '#c89de9' }}
            >
              <Ionicons
                name="add"
                size={22}
                color={quantidade === MAX_INGRESSOS ? '#8a7aa3' : '#fff'}
              />
            </Pressable>

          </View>

          <Text style={styles.preco}>
            Ingresso: R$ {PRECO_INGRESSO.toFixed(2)}
          </Text>

          <View style={styles.caixaTotal}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.valorTotal}>
              R$ {total.toFixed(2)}
            </Text>
          </View>

          <Pressable
            style={styles.botao}
            onPress={() =>
              router.push(
                `/pagamento?id=${movie.id}&sessao=${sessao}&quantidade=${quantidade}`
              )
            }
            android_ripple={{ color: '#c89de9' }}
          >
            <Text style={styles.textoBotao}>
              Continuar
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#2b004d" />
          </Pressable>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  fundo: {
    flex: 1,
    backgroundColor: '#120b1d',
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

  ingressos: {
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  imagem: {
    width: 150,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#c89de9',
    marginBottom: 16,
  },

  nomeFilme: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  badgeSessao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#c89de9',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },

  textoBadge: {
    color: '#2b004d',
    fontSize: 13,
    fontWeight: 'bold',
  },

  tituloQuantidade: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 22,
  },

  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },

  botaoQuantidade: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2b004d',
    borderWidth: 1,
    borderColor: '#c89de9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  numero: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 32,
    textAlign: 'center',
  },

  preco: {
    color: '#f0e5ff',
    fontSize: 15,
    marginTop: 22,
  },

  caixaTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2b004d',
    borderWidth: 1,
    borderColor: '#c89de9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
    width: '80%',
    alignSelf: 'center',
  },

  labelTotal: {
    color: '#c89de9',
    fontSize: 13,
    fontWeight: '600',
  },

  valorTotal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

  logo: {
    alignSelf: 'center',
    marginTop: '10%',
    width: 250,
    height: 210,
    resizeMode: 'contain',
  },

});