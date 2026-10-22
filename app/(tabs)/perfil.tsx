
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
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

export default function Perfil() {
  const { width } = useWindowDimensions();

  const larguraConteudo = Math.min(width - 32, 620);

  const emBreve = (titulo: string) => {
    Alert.alert(
      titulo,
      'Essa funcionalidade estará disponível em breve! 🚧'
    );
  };

  const opcoes = [
    {
      titulo: 'Meus Ingressos',
      descricao: 'Consulte suas compras',
      icone: 'ticket-outline' as const,
    },
    {
      titulo: 'Configurações',
      descricao: 'Personalize sua experiência',
      icone: 'settings-outline' as const,
    },
    {
      titulo: 'Ajuda & Suporte',
      descricao: 'Estamos aqui para ajudar',
      icone: 'help-circle-outline' as const,
    },
  ];

  return (
    <View style={styles.fundo}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.areaPrincipal,
            { width: larguraConteudo },
          ]}
        >
          {/* Cabeçalho */}
          <View style={styles.cabecalho}>
            <Text style={styles.tituloPagina}>
              Meu perfil
            </Text>

            <Text style={styles.subtituloPagina}>
              Sua conta no universo Violet+
            </Text>
          </View>

          {/* Card de perfil */}
          <View style={styles.cardPerfil}>
            <View style={styles.avatarContainer}>
              <Ionicons
                name="person"
                size={35}
                color={CORES.lilas}
              />

              <View style={styles.indicadorAvatar} />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.rotuloPerfil}>
                CONTA VIOLET+
              </Text>

              <Text style={styles.nome}>
                Usuário Violet+
              </Text>

              <Text style={styles.email}>
                usuario@violet.com
              </Text>

              <Pressable
                style={styles.botaoEditar}
                onPress={() => emBreve('Editar Perfil')}
                accessibilityRole="button"
              >
                <Ionicons
                  name="pencil-outline"
                  size={14}
                  color={CORES.lilas}
                />

                <Text style={styles.textoEditar}>
                  Editar perfil
                </Text>
              </Pressable>
            </View>

            <Ionicons
              name="sparkles-outline"
              size={22}
              color={CORES.roxo}
              style={styles.iconeDecorativo}
            />
          </View>

          {/* Menu */}
          <View style={styles.secaoMenu}>
            <Text style={styles.tituloSecao}>
              Sua conta
            </Text>

            <Text style={styles.descricaoSecao}>
              Acesse suas opções
            </Text>

            <View style={styles.listaOpcoes}>
              {opcoes.map((opcao, index) => (
                <View key={opcao.titulo}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.item,
                      pressed && styles.itemPressionado,
                    ]}
                    onPress={() => emBreve(opcao.titulo)}
                    accessibilityRole="button"
                  >
                    <View style={styles.itemEsquerda}>
                      <View style={styles.iconeContainer}>
                        <Ionicons
                          name={opcao.icone}
                          size={21}
                          color={CORES.lilas}
                        />
                      </View>

                      <View style={styles.textosItem}>
                        <Text style={styles.textoItem}>
                          {opcao.titulo}
                        </Text>

                        <Text style={styles.descricaoItem}>
                          {opcao.descricao}
                        </Text>
                      </View>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={19}
                      color={CORES.textoSecundario}
                    />
                  </Pressable>

                  {index < opcoes.length - 1 && (
                    <View style={styles.divisorItem} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Sair */}
          <Pressable
            style={({ pressed }) => [
              styles.botaoSair,
              pressed && styles.botaoSairPressionado,
            ]}
            onPress={() => emBreve('Sair')}
            accessibilityRole="button"
          >
            <View style={styles.iconeSair}>
              <Ionicons
                name="log-out-outline"
                size={21}
                color="#ff8d9b"
              />
            </View>

            <View style={styles.textosSair}>
              <Text style={styles.textoSair}>
                Sair da conta
              </Text>

              <Text style={styles.descricaoSair}>
                Encerrar sua sessão
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#ff8d9b"
            />
          </Pressable>

          {/* Rodapé */}
          <View style={styles.rodape}>
            <View style={styles.linhaRodape} />

            <Text style={styles.nomeRodape}>
              Violet<Text style={styles.maisRodape}>+</Text>
            </Text>

            <Text style={styles.textoRodape}>
              Seu próximo filme começa aqui.
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

  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 110,
  },

  areaPrincipal: {
    maxWidth: 620,
    alignSelf: 'center',
    gap: 24,
  },

  cabecalho: {
    gap: 6,
  },

  tituloPagina: {
    color: CORES.texto,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },

  subtituloPagina: {
    color: CORES.textoSecundario,
    fontSize: 14,
  },

  cardPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 19,
    backgroundColor: CORES.painel,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CORES.borda,
    position: 'relative',
    overflow: 'hidden',
  },

  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#241530',
    borderWidth: 1.5,
    borderColor: CORES.roxo,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  indicadorAvatar: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#a8f0bd',
    borderWidth: 2,
    borderColor: CORES.painel,
    right: 1,
    bottom: 2,
  },

  infoContainer: {
    flex: 1,
    gap: 5,
  },

  rotuloPerfil: {
    color: CORES.roxo,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },

  nome: {
    color: CORES.texto,
    fontSize: 18,
    fontWeight: '800',
  },

  email: {
    color: CORES.textoSecundario,
    fontSize: 12,
  },

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 9,
    backgroundColor: '#241530',
    borderWidth: 1,
    borderColor: '#49305e',
  },

  textoEditar: {
    color: CORES.lilas,
    fontSize: 12,
    fontWeight: '700',
  },

  iconeDecorativo: {
    alignSelf: 'flex-start',
  },

  secaoMenu: {
    gap: 7,
  },

  tituloSecao: {
    color: CORES.texto,
    fontSize: 18,
    fontWeight: '800',
  },

  descricaoSecao: {
    color: CORES.textoSecundario,
    fontSize: 13,
    marginBottom: 8,
  },

  listaOpcoes: {
    backgroundColor: CORES.painel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CORES.borda,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 12,
  },

  itemPressionado: {
    backgroundColor: CORES.superficie,
  },

  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 13,
  },

  iconeContainer: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: CORES.superficie,
    borderWidth: 1,
    borderColor: CORES.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textosItem: {
    flex: 1,
    gap: 4,
  },

  textoItem: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '700',
  },

  descricaoItem: {
    color: CORES.textoSecundario,
    fontSize: 12,
  },

  divisorItem: {
    height: 1,
    backgroundColor: CORES.borda,
    marginLeft: 57,
  },

  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: '#180e18',
    borderWidth: 1,
    borderColor: '#482331',
    borderRadius: 16,
    padding: 14,
  },

  botaoSairPressionado: {
    backgroundColor: '#26121f',
  },

  iconeSair: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#301621',
  },

  textosSair: {
    flex: 1,
    gap: 4,
  },

  textoSair: {
    color: '#ff9aa6',
    fontSize: 14,
    fontWeight: '800',
  },

  descricaoSair: {
    color: CORES.textoSecundario,
    fontSize: 12,
  },

  rodape: {
    alignItems: 'center',
    gap: 7,
    paddingTop: 4,
  },

  linhaRodape: {
    height: 1,
    width: '100%',
    backgroundColor: CORES.borda,
    marginBottom: 12,
  },

  nomeRodape: {
    color: CORES.texto,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  maisRodape: {
    color: CORES.roxo,
  },

  textoRodape: {
    color: CORES.textoSecundario,
    fontSize: 11,
  },
});
