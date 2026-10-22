
import { useState } from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { movies } from '@/data/movie';

const PRECO_INGRESSO = 25;

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

const opcoesPagamento = [
  {
    label: 'Cartão de crédito',
    descricao: 'Pague com seu cartão de crédito',
    icone: 'card-outline' as const,
  },
  {
    label: 'Pix',
    descricao: 'Pagamento rápido',
    icone: 'qr-code-outline' as const,
  },
  {
    label: 'Cartão de débito',
    descricao: 'Pague com seu cartão de débito',
    icone: 'card-outline' as const,
  },
];

export default function Pagamento() {
  const { id, sessao, quantidade } = useLocalSearchParams<{
    id?: string | string[];
    sessao?: string | string[];
    quantidade?: string | string[];
  }>();

  const router = useRouter();
  const { width } = useWindowDimensions();

  const idFilme = Array.isArray(id) ? id[0] : id;
  const sessaoSelecionada = Array.isArray(sessao)
    ? sessao[0]
    : sessao;
  const quantidadeParametro = Array.isArray(quantidade)
    ? quantidade[0]
    : quantidade;

  const movie = movies.find(
    (item) => String(item.id) === String(idFilme)
  );

  const quantidadeIngressos = Math.max(
    1,
    Math.min(10, Number(quantidadeParametro) || 1)
  );

  const total = quantidadeIngressos * PRECO_INGRESSO;

  const [formaPagamento, setFormaPagamento] =
    useState<string | null>(null);

  const larguraPainel = Math.min(width - 32, 480);

  if (!movie) {
    return (
      <View style={styles.fundoErro}>
        <Image
          source={require('../../assets/imgs/Morceguinho.png')}
          style={styles.logoErro}
          resizeMode="contain"
        />

        <Text style={styles.erroTitulo}>
          Nenhum pagamento pendente
        </Text>

        <Text style={styles.erroDescricao}>
          Escolha um filme e uma sessão para continuar sua compra.
        </Text>

        <Pressable
          style={styles.botaoVoltarErro}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.textoBotaoVoltarErro}>
            Voltar aos filmes
          </Text>
        </Pressable>
      </View>
    );
  }

  function finalizarPagamento() {
    if (!formaPagamento) return;

    alert(
      `Obrigado por comprar com Violet!`);
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
            styles.pagamento,
            { width: larguraPainel },
          ]}
        >
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

            <View style={styles.cabecalhoTexto}>
              <Text style={styles.titulo}>
                Pagamento
              </Text>

              <Text style={styles.subtitulo}>
                Falta pouco para sua sessão!
              </Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <Text style={styles.tituloSecao}>
            Resumo do pedido
          </Text>

          <View style={styles.filme}>
            <Image
              source={movie.image}
              style={styles.imagem}
              resizeMode="cover"
            />

            <View style={styles.informacoesFilme}>
              <Text style={styles.rotuloPequeno}>
                SEU FILME
              </Text>

              <Text style={styles.nomeFilme}>
                {movie.name}
              </Text>

              <View style={styles.informacaoLinha}>
                <Ionicons
                  name="time-outline"
                  size={15}
                  color={CORES.lilas}
                />

                <Text style={styles.textoInformacao}>
                  {sessaoSelecionada || 'Sessão não informada'}
                </Text>
              </View>

              <View style={styles.informacaoLinha}>
                <Ionicons
                  name="ticket-outline"
                  size={15}
                  color={CORES.lilas}
                />

                <Text style={styles.textoInformacao}>
                  {quantidadeIngressos}{' '}
                  {quantidadeIngressos === 1
                    ? 'ingresso'
                    : 'ingressos'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.resumoValores}>
            <View style={styles.linhaValor}>
              <Text style={styles.textoValor}>
                Ingresso
              </Text>

              <Text style={styles.textoValor}>
                R$ {PRECO_INGRESSO.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.linhaValor}>
              <Text style={styles.textoValor}>
                Quantidade
              </Text>

              <Text style={styles.textoValor}>
                {quantidadeIngressos}x
              </Text>
            </View>

            <View style={styles.divisorResumo} />

            <View style={styles.linhaValor}>
              <Text style={styles.labelTotal}>
                Total a pagar
              </Text>

              <Text style={styles.valorTotal}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>

          <View style={styles.cabecalhoPagamento}>
            <Text style={styles.tituloSecao}>
              Forma de pagamento
            </Text>

            <Ionicons
              name="lock-closed-outline"
              size={15}
              color={CORES.textoSecundario}
            />
          </View>

          <Text style={styles.ajudaPagamento}>
            Selecione como deseja pagar.
          </Text>

          <View style={styles.listaOpcoes}>
            {opcoesPagamento.map((opcao) => {
              const selecionada =
                formaPagamento === opcao.label;

              return (
                <Pressable
                  key={opcao.label}
                  style={[
                    styles.opcao,
                    selecionada && styles.opcaoSelecionada,
                  ]}
                  onPress={() => setFormaPagamento(opcao.label)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: selecionada }}
                >
                  <View
                    style={[
                      styles.iconeOpcao,
                      selecionada && styles.iconeOpcaoSelecionada,
                    ]}
                  >
                    <Ionicons
                      name={opcao.icone}
                      size={21}
                      color={
                        selecionada
                          ? CORES.lilas
                          : CORES.textoSecundario
                      }
                    />
                  </View>

                  <View style={styles.textosOpcao}>
                    <Text
                      style={[
                        styles.textoOpcao,
                        selecionada && styles.textoOpcaoSelecionada,
                      ]}
                    >
                      {opcao.label}
                    </Text>

                    <Text style={styles.descricaoOpcao}>
                      {opcao.descricao}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.seletor,
                      selecionada && styles.seletorSelecionado,
                    ]}
                  >
                    {selecionada && (
                      <View style={styles.seletorCentro} />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={[
              styles.botaoPagar,
              !formaPagamento && styles.botaoDesabilitado,
            ]}
            onPress={finalizarPagamento}
            disabled={!formaPagamento}
            accessibilityRole="button"
          >
            <Text style={styles.textoBotaoPagar}>
              Pagar R$ {total.toFixed(2).replace('.', ',')}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={CORES.fundo}
            />
          </Pressable>

          <View style={styles.avisoSeguranca}>
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color={CORES.textoSecundario}
            />

            <Text style={styles.textoSeguranca}>
              Ambiente de demonstração do Violet+
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
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
  },

  pagamento: {
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: CORES.painel,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 22,
    padding: 22,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
  },

  cabecalhoTexto: {
    flex: 1,
  },

  titulo: {
    color: CORES.texto,
    fontSize: 25,
    fontWeight: '800',
  },

  subtitulo: {
    color: CORES.textoSecundario,
    fontSize: 13,
    marginTop: 4,
  },

  divisor: {
    height: 1,
    backgroundColor: CORES.borda,
    marginBottom: 22,
  },

  tituloSecao: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '700',
  },

  filme: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 20,
  },

  imagem: {
    width: 96,
    height: 132,
    borderRadius: 10,
    backgroundColor: CORES.superficie,
  },

  informacoesFilme: {
    flex: 1,
    gap: 9,
  },

  rotuloPequeno: {
    color: CORES.roxo,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  nomeFilme: {
    color: CORES.texto,
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 25,
  },

  informacaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  textoInformacao: {
    color: CORES.textoSecundario,
    fontSize: 13,
    flexShrink: 1,
  },

  resumoValores: {
    backgroundColor: CORES.superficie,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.borda,
    padding: 16,
    gap: 13,
  },

  linhaValor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  textoValor: {
    color: CORES.textoSecundario,
    fontSize: 13,
  },

  divisorResumo: {
    height: 1,
    backgroundColor: CORES.borda,
  },

  labelTotal: {
    color: CORES.texto,
    fontSize: 15,
    fontWeight: '700',
  },

  valorTotal: {
    color: CORES.lilas,
    fontSize: 21,
    fontWeight: '800',
  },

  cabecalhoPagamento: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 26,
  },

  ajudaPagamento: {
    color: CORES.textoSecundario,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 14,
  },

  listaOpcoes: {
    gap: 10,
  },

  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 13,
    padding: 13,
  },

  opcaoSelecionada: {
    borderColor: CORES.roxo,
    backgroundColor: '#1d1029',
  },

  iconeOpcao: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21162d',
  },

  iconeOpcaoSelecionada: {
    backgroundColor: '#342044',
  },

  textosOpcao: {
    flex: 1,
    gap: 4,
  },

  textoOpcao: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '700',
  },

  textoOpcaoSelecionada: {
    color: CORES.lilas,
  },

  descricaoOpcao: {
    color: CORES.textoSecundario,
    fontSize: 11,
    lineHeight: 15,
  },

  seletor: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#766481',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seletorSelecionado: {
    borderColor: CORES.roxo,
  },

  seletorCentro: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: CORES.roxo,
  },

  botaoPagar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: CORES.lilas,
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginTop: 22,
  },

  botaoDesabilitado: {
    opacity: 0.4,
  },

  textoBotaoPagar: {
    color: CORES.fundo,
    fontSize: 15,
    fontWeight: '800',
  },

  avisoSeguranca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 16,
  },

  textoSeguranca: {
    color: CORES.textoSecundario,
    fontSize: 11,
    textAlign: 'center',
  },

  fundoErro: {
    flex: 1,
    backgroundColor: CORES.fundo,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },

  logoErro: {
    width: 220,
    height: 190,
    marginBottom: 18,
  },

  erroTitulo: {
    color: CORES.texto,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },

  erroDescricao: {
    color: CORES.textoSecundario,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 22,
  },

  botaoVoltarErro: {
    backgroundColor: CORES.lilas,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  textoBotaoVoltarErro: {
    color: CORES.fundo,
    fontSize: 14,
    fontWeight: '800',
  }
});
