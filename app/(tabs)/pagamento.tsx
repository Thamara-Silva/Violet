import { useState } from 'react';

import {
  Image, Pressable, ScrollView,
  StyleSheet,
  Text, View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { movies } from '@/data/movie';

const PRECO_INGRESSO = 25;

export default function Pagamento() {

  const { id, sessao, quantidade } = useLocalSearchParams();

  const router = useRouter();

  const movie = movies.find(
    (movie) => movie.id === id
  );

  const total = Number(quantidade) * PRECO_INGRESSO;

  const [formaPagamento, setFormaPagamento] =
    useState<string | null>(null);

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <Image
          source={require('../../assets/imgs/Morceguinho.png')}
          style={styles.logo}
        />
        <Text style={styles.erro}>
          Nenhum pagamento pendente por aqui.
        </Text>
      </View>
    );
  }

  const opcoes = [
    { label: 'Cartão de crédito', icone: 'card' },
    { label: 'Pix', icone: 'qr-code' },
    { label: 'Cartão de débito', icone: 'card-outline' },
  ];

  return (
    <View style={styles.fundo}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.pagamento}>

          <Pressable
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            android_ripple={{ color: '#c89de9', borderless: true }}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>

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


          <View style={styles.badges}>
            <View style={styles.badge}>
              <Ionicons name="time-outline" size={13} color="#2b004d" />
              <Text style={styles.textoBadge}>
                {sessao}
              </Text>
            </View>

            <View style={styles.badge}>
              <Ionicons name="ticket-outline" size={13} color="#2b004d" />
              <Text style={styles.textoBadge}>
                {quantidade} {Number(quantidade) === 1 ? 'ingresso' : 'ingressos'}
              </Text>
            </View>
          </View>

          <View style={styles.caixaTotal}>
            <Text style={styles.labelTotal}>Total</Text>
            <Text style={styles.valorTotal}>
              R$ {total.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.tituloPagamento}>
            Forma de pagamento
          </Text>

          {opcoes.map((opcao) => {
            const selecionada = formaPagamento === opcao.label;
            return (
              <Pressable
                key={opcao.label}
                style={[
                  styles.opcao,
                  selecionada && styles.opcaoSelecionada,
                ]}
                onPress={() => setFormaPagamento(opcao.label)}
                android_ripple={{ color: '#c89de9' }}
              >
                <View style={styles.opcaoEsquerda}>
                  <Ionicons
                    name={opcao.icone as any}
                    size={20}
                    color={selecionada ? '#c89de9' : '#8a7aa3'}
                  />
                  <Text
                    style={[
                      styles.textoOpcao,
                      selecionada && styles.textoOpcaoSelecionada,
                    ]}
                  >
                    {opcao.label}
                  </Text>
                </View>

                {selecionada && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color="#c89de9"
                  />
                )}
              </Pressable>
            );
          })}

          <Pressable
            style={[
              styles.botao,
              !formaPagamento && styles.botaoDesabilitado,
            ]}
            onPress={() => alert('Obrigado por comprar com Violet!')}
            disabled={!formaPagamento}
            android_ripple={{ color: '#c89de9' }}
          >
            <Text style={styles.textoBotao}>
              Pagar
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

  pagamento: {
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
    width: 120,
    height: 160,
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

   //nome chique pro horariozinho veio em baixo da foto 
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#c89de9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  textoBadge: {
    color: '#2b004d',
    fontSize: 12,
    fontWeight: 'bold',
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
    marginTop: 18,
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

  tituloPagamento: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },

 
  opcao: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 20,
  backgroundColor: '#2b004d',
  borderWidth: 1,
  borderColor: '#c89de9',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  marginBottom: 10,
  alignSelf: 'center',       
  minWidth: 200,         
},

  opcaoSelecionada: {
    backgroundColor: '#2b004d',
    borderWidth: 2,
    borderColor: '#c89de9',
    shadowColor: '#c084fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },

  opcaoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  textoOpcao: {
    color: '#ddd',
    fontSize: 15,
    fontWeight: '600',
  },

  textoOpcaoSelecionada: {
    color: '#fff',
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

  botaoDesabilitado: {
    opacity: 0.4,
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
    padding: 10,
  },

  logo: {
    alignSelf: 'center',
    marginTop: '9%',
    width: 300,
    height: 260,
    resizeMode: 'contain',
  },

});