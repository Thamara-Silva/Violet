import { Tabs } from "expo-router"
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{

        header: () => (
          <View style={styles.headerContainer}>

            <Image source={require('../../assets/imgs/Violet.png')} style={styles.logo}/>         

              <TextInput
              style={styles.pesquisaInput}
              placeholder="Buscar filmes..."
              placeholderTextColor="#a574ca"
            />
          </View>
        ),
        tabBarStyle: {
          backgroundColor: '#2f1746',
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fcf9f9',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#b14cff',
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Filmes" }} />
      <Tabs.Screen name="ingressos" options={{ title: "Ingressos" }} />
      <Tabs.Screen name="pagamento" options={{ title: "Pagamento" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2f1746',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
    flexDirection: 'row',
    gap: 50,

  },
  logo: {
    marginLeft: 10,
    maxHeight: 60,
    maxWidth: 100,
  },
  pesquisaInput: {
    backgroundColor: '#0b0712',
    borderRadius: 18,
    paddingHorizontal: 16,
    color: '#a574ca',
    fontSize: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: '#0b0712',
    width: '30%',
  },
});