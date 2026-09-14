import React, { useState } from 'react';

import {Text,View, StyleSheet, Image, Pressable, ScrollView,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { movies } from '@/data/movie';

export default function Pagamento() {

  const { id, sessao, quantidade } = useLocalSearchParams();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  const preco = 25;
  const total = Number(quantidade) * preco;
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <Text style={styles.erro}>
          Filme não encontrado.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}>

        <View style={styles.pagamento}>

          <Text style={styles.titulo}>
            Pagamento
          </Text>

          <Image
            source={movie.image}
            style={styles.imagem}
          />

          <Text style={styles.nomeFilme}>
            {movie.name}
          </Text>

          <Text style={styles.informacao}>
            Sessão: {sessao}
          </Text>

          <Text style={styles.informacao}>
            Quantidade: {quantidade}
          </Text>

          <View style={styles.linha} />

          <Text style={styles.total}>
            Total: R$ {total.toFixed(2)}
          </Text>

          <Text style={styles.tituloPagamento}>
            Forma de pagamento
          </Text>

          <Pressable
                style={[ styles.opcao, formaPagamento === 'Cartão de crédito' && styles.opcaoSelecionada
                ]}
                onPress={() => setFormaPagamento('Cartão de crédito')}>

                <Text
                    style={[styles.textoOpcao, formaPagamento === 'Cartão de crédito' && styles.textoOpcaoSelecionada]}>
                     Cartão de crédito
                </Text>
          </Pressable>

          <Pressable
            style={[styles.opcao, formaPagamento === 'Pix' && styles.opcaoSelecionada]} onPress={() => setFormaPagamento('Pix')}>
              <Text style={[styles.textoOpcao, formaPagamento === 'Pix' && styles.textoOpcaoSelecionada]}>
                Pix
              </Text>
          </Pressable>

          <Pressable style={[styles.opcao, formaPagamento === 'Cartão de débito' && styles.opcaoSelecionada]} onPress={() => setFormaPagamento('Cartão de débito')}>
            <Text
              style={[ styles.textoOpcao, formaPagamento === 'Cartão de débito' && styles.textoOpcaoSelecionada]}>
              Cartão de débito
            </Text>
          </Pressable>          
          
          <Pressable style={styles.botao} onPress={() => alert('Obrigado por comprar com Violet!')}>
            <Text style={styles.textoBotao}>
              Pagar
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

  pagamento: {
    backgroundColor: '#7942ac',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  imagem: {
    width: 120,
    height: 160,
    borderRadius: 10,
    marginBottom: 15,
  },

  nomeFilme: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  informacao: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 8,
  },

  linha: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff50',
    marginVertical: 20,
  },

  total: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  tituloPagamento: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  opcao: {
    width: '40%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  textoOpcao: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  botao: {
    width: '40%',
    backgroundColor: '#25D366',
    borderRadius: 10,
    padding: 14,
    marginTop: 15,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  erro: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  opcaoSelecionada: {
  backgroundColor: '#7c3aed',
  borderWidth: 2,
  borderColor: '#fff',
},

textoOpcaoSelecionada: {
  color: '#fff',
},

});