import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function Perfil() {

  const emBreve = (titulo: string) => {
    Alert.alert(
      titulo,
      'Essa funcionalidade estará disponível em breve! 🚧'
    );
  };

  return (
    <View style={styles.fundo}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >

        {/* ---------- CARD DE PERFIL ---------- */}
        <View style={styles.cardPerfil}>

          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={38} color="#fff" />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.nome}>
              Usuário Violet+
            </Text>
            <Text style={styles.email}>
              usuario@violet.com
            </Text>

            <Pressable
              style={styles.botaoEditar}
              onPress={() => emBreve('Editar Perfil')}
              android_ripple={{ color: '#c89de9' }}
            >
              <Ionicons name="pencil" size={14} color="#2b004d" />
              <Text style={styles.textoEditar}>
                Editar Perfil
              </Text>
            </Pressable>
          </View>

        </View>


        <View style={styles.listaOpcoes}>

          <Pressable
            style={styles.item}
            onPress={() => emBreve('Meus Ingressos')}
            android_ripple={{ color: '#c89de9' }}
          >
            <View style={styles.itemEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons name="ticket" size={20} color="#fff" />
              </View>
              <Text style={styles.textoItem}>
                Meus Ingressos
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#c89de9" />
          </Pressable>

          <Pressable
            style={styles.item}
            onPress={() => emBreve('Configurações')}
            android_ripple={{ color: '#c89de9' }}
          >
            <View style={styles.itemEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons name="settings" size={20} color="#fff" />
              </View>
              <Text style={styles.textoItem}>
                Configurações
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#c89de9" />
          </Pressable>

          <Pressable
            style={styles.item}
            onPress={() => emBreve('Ajuda & Suporte')}
            android_ripple={{ color: '#c89de9' }}
          >
            <View style={styles.itemEsquerda}>
              <View style={styles.iconeContainer}>
                <Ionicons name="help-circle" size={20} color="#fff" />
              </View>
              <Text style={styles.textoItem}>
                Ajuda & Suporte
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#c89de9" />
          </Pressable>

        </View>

        <Pressable
          style={styles.botaoSair}
          onPress={() => emBreve('Sair')}
          android_ripple={{ color: '#c89de9' }}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.textoSair}>
            Sair
          </Text>
        </Pressable>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  fundo: {
    backgroundColor:  '#120b1d',
    flex: 1,
  },

  conteudo: {
    padding: 20,
    paddingBottom: 100,
    gap: 20,
  },


  cardPerfil: {
    backgroundColor: '#7942ac',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: '#c89de9',
    elevation: 10,
  },

  avatarContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#2b004d',
    borderWidth: 3,
    borderColor: '#c89de9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoContainer: {
    flex: 1,
    gap: 4,
  },

  nome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  email: {
    color: '#f0e5ff',
    fontSize: 13,
    marginBottom: 8,
  },

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#c89de9',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    elevation: 5,
  },

  textoEditar: {
    color: '#2b004d',
    fontWeight: 'bold',
    fontSize: 13,
  },

  listaOpcoes: {
    backgroundColor: '#7942ac',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#c89de9',
    gap: 6,
    elevation: 8,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconeContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2b004d',
    borderWidth: 1,
    borderColor: '#c89de9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoItem: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#2b004d',
    borderWidth: 2,
    borderColor: '#c89de9',
    borderRadius: 20,
    paddingVertical: 15,
    elevation: 6,
  },

  textoSair: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});