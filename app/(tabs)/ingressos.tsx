
import React, { useState } from 'react';

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

import { useLocalSearchParams, useRouter } from 'expo-router';

import { movies } from '@/data/movie';

const PRECO_INGRESSO = 25;
const MAX_INGRESSOS = 10;

export default function Ingressos() {
  const { id, sessao } = useLocalSearchParams<{
    id?: string;
    sessao?: string;
  }>();

  const router = useRouter();
  const { width } = useWindowDimensions();

  // Compara como texto para aceitar IDs recebidos pela rota.
  const movie = movies.find(
    (item) => String(item.id) === String(id)
  );

  const [quantidade, setQuantidade] = useState(1);

  const total = quantidade * PRECO_INGRESSO;

  const sessaoSelecionada = Array.isArray(sessao)
    ? sessao[0]
    : sessao;

  const voltar = () => {
    router.back();
  };

  const diminuir = () => {
    setQuantidade((atual) => Math.max(1, atual - 1));
  };

  const aumentar = () => {
    setQuantidade((atual) =>
      Math.min(MAX_INGRESSOS, atual + 1)
    );
  };

  const continuarPagamento = () => {
    if (!movie) return;

    router.push({
      pathname: '/pagamento',
      params: {
        id: String(movie.id),
        sessao: sessaoSelecionada ?? '',
        quantidade: String(quantidade),
      },
    });
  };

  if (!movie) {
    return (
      <View style={styles.fundo}>
        <View style={styles.erroContainer}>
          <Image
            source={require('../../assets/imgs/MorceguinhoT.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.erroTitulo}>
            Ops! Nenhum ingresso por aqui.
          </Text>

          <Text style={styles.erroDescricao}>
            Não encontramos esse filme. Volte ao catálogo
            e escolha um filme para continuar.
          </Text>

          <Pressable
            style={styles.botao}
            onPress={voltar}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color="#ffffff"
            />

            <Text style={styles.textoBotao}>
              Voltar
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const larguraPainel = Math.min(width - 32, 480);

  return (
    <View style={styles.fundo}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudoScroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.painel,
            { width: larguraPainel },
          ]}
        >
          {/* CABEÇALHO */}
          <View style={styles.cabecalho}>
            <Pressable
              style={styles.botaoVoltar}
              onPress={voltar}
              accessibilityLabel="Voltar"
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color="#ffffff"
              />
            </Pressable>

            <View style={styles.titulosCabecalho}>
              <Text style={styles.subtitulo}>
                VIOLET+ CINEMA
              </Text>

              <Text style={styles.titulo}>
                Seus ingressos
              </Text>
            </View>
          </View>

          <View style={styles.linhaDecorativa} />

          {/* INFORMAÇÕES DO FILME */}
          <View style={styles.filmeContainer}>
            <Image
              source={movie.image}
              style={styles.imagem}
              resizeMode="cover"
            />

            <View style={styles.informacoesFilme}>
              <Text style={styles.labelFilme}>
                VOCÊ ESCOLHEU
              </Text>

              <Text style={styles.nomeFilme}>
                {movie.name}
              </Text>

              <View style={styles.badgeSessao}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color="#d4a0ff"
                />

                <View style={styles.textoSessaoContainer}>
                  <Text style={styles.labelSessao}>
                    HORÁRIO DA SESSÃO
                  </Text>

                  <Text style={styles.textoSessao}>
                    {sessaoSelecionada || 'Não informado'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divisor} />

          {/* QUANTIDADE */}
          <View style={styles.secaoQuantidade}>
            <Text style={styles.tituloSecao}>
              Quantidade de ingressos
            </Text>

            <Text style={styles.descricaoSecao}>
              Selecione quantos ingressos deseja comprar.
            </Text>

            <View style={styles.quantidade}>
              <Pressable
                style={[
                  styles.botaoQuantidade,
                  quantidade === 1 && styles.botaoDesabilitado,
                ]}
                onPress={diminuir}
                disabled={quantidade === 1}
                accessibilityLabel="Diminuir quantidade"
              >
                <Ionicons
                  name="remove"
                  size={22}
                  color={quantidade === 1 ? '#71647e' : '#ffffff'}
                />
              </Pressable>

              <View style={styles.numeroContainer}>
                <Text style={styles.numero}>
                  {quantidade}
                </Text>

                <Text style={styles.labelUnidade}>
                  {quantidade === 1 ? 'ingresso' : 'ingressos'}
                </Text>
              </View>

              <Pressable
                style={[
                  styles.botaoQuantidade,
                  quantidade === MAX_INGRESSOS &&
                    styles.botaoDesabilitado,
                ]}
                onPress={aumentar}
                disabled={quantidade === MAX_INGRESSOS}
                accessibilityLabel="Aumentar quantidade"
              >
                <Ionicons
                  name="add"
                  size={22}
                  color={
                    quantidade === MAX_INGRESSOS
                      ? '#71647e'
                      : '#ffffff'
                  }
                />
              </Pressable>
            </View>

            <Text style={styles.limite}>
              Mínimo de 1 e máximo de {MAX_INGRESSOS} ingressos
            </Text>
          </View>

          <View style={styles.divisor} />

          {/* RESUMO DO PEDIDO */}
          <View style={styles.resumo}>
            <Text style={styles.tituloSecao}>
              Resumo do pedido
            </Text>

            <View style={styles.linhaPreco}>
              <Text style={styles.labelPreco}>
                Valor por ingresso
              </Text>

              <Text style={styles.valorPreco}>
                R$ {PRECO_INGRESSO.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.linhaPreco}>
              <Text style={styles.labelPreco}>
                Quantidade
              </Text>

              <Text style={styles.valorPreco}>
                {quantidade}x
              </Text>
            </View>

            <View style={styles.divisorResumo} />

            <View style={styles.caixaTotal}>
              <View>
                <Text style={styles.labelTotal}>
                  TOTAL DO PEDIDO
                </Text>

                <Text style={styles.descricaoTotal}>
                  {quantidade} {quantidade === 1 ? 'ingresso' : 'ingressos'}
                </Text>
              </View>

              <Text style={styles.valorTotal}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>

          {/* CONTINUAR */}
          <Pressable
            style={styles.botao}
            onPress={continuarPagamento}
          >
            <Text style={styles.textoBotao}>
              Continuar para pagamento
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#ffffff"
            />
          </Pressable>

          <View style={styles.aviso}>
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color="#92879f"
            />

            <Text style={styles.textoAviso}>
              Confira os dados antes de continuar.
            </Text>
          </View>
        </View>

        {/* RODAPÉ */}
        <Text style={styles.rodape}>
          VIOLET+  •  SEU CINEMA, SEU UNIVERSO
        </Text>
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

  conteudoScroll: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },

  painel: {
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: '#171020',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#352044',
    padding: 22,
  },

  // CABEÇALHO

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#24152f',
    borderWidth: 1,
    borderColor: '#49305c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulosCabecalho: {
    flex: 1,
  },

  subtitulo: {
    color: '#b14cff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  titulo: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '800',
  },

  linhaDecorativa: {
    height: 3,
    width: 44,
    borderRadius: 3,
    backgroundColor: '#b14cff',
    marginTop: 20,
    marginBottom: 24,
  },

  // FILME

  filmeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  imagem: {
    width: 112,
    height: 164,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#49305c',
    backgroundColor: '#24152f',
  },

  informacoesFilme: {
    flex: 1,
    justifyContent: 'center',
  },

  labelFilme: {
    color: '#92879f',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },

  nomeFilme: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 25,
    marginBottom: 18,
  },

  badgeSessao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#24152f',
    borderWidth: 1,
    borderColor: '#49305c',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  textoSessaoContainer: {
    flex: 1,
  },

  labelSessao: {
    color: '#92879f',
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },

  textoSessao: {
    color: '#d4a0ff',
    fontSize: 14,
    fontWeight: '800',
  },

  divisor: {
    height: 1,
    backgroundColor: '#352044',
    marginVertical: 24,
  },

  // QUANTIDADE

  secaoQuantidade: {
    alignItems: 'center',
  },

  tituloSecao: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },

  descricaoSecao: {
    color: '#92879f',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 8,
  },

  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginTop: 22,
  },

  botaoQuantidade: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#24152f',
    borderWidth: 1,
    borderColor: '#70408e',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  numeroContainer: {
    alignItems: 'center',
    minWidth: 60,
  },

  numero: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  labelUnidade: {
    color: '#b14cff',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },

  limite: {
    color: '#71647e',
    fontSize: 10,
    marginTop: 16,
    textAlign: 'center',
  },

  // RESUMO

  resumo: {
    gap: 16,
  },

  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  labelPreco: {
    color: '#bcb2c9',
    fontSize: 13,
  },

  valorPreco: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },

  divisorResumo: {
    height: 1,
    backgroundColor: '#352044',
  },

  caixaTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  labelTotal: {
    color: '#d4a0ff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  descricaoTotal: {
    color: '#92879f',
    fontSize: 11,
    marginTop: 5,
  },

  valorTotal: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
  },

  // BOTÃO PRINCIPAL

  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#9b3df5',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#b76aff',
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },

  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
  },

  textoAviso: {
    color: '#92879f',
    fontSize: 10,
    textAlign: 'center',
  },

  // FILME NÃO ENCONTRADO

  erroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logo: {
    width: 220,
    height: 190,
    marginBottom: 20,
  },

  erroTitulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },

  erroDescricao: {
    color: '#bcb2c9',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 12,
  },

  // RODAPÉ

  rodape: {
    color: '#71647e',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    marginTop: 24,
  },
});
