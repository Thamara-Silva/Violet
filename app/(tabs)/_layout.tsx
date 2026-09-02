import { Tabs } from "expo-router"
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default function RootLayout(){
  return( 
    <Tabs
      screenOptions={{
        
        header: () => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitulo}>Violet+</Text>
            <TextInput
              style={styles.pesquisaInput}
              placeholder="Buscar filmes..."
              placeholderTextColor="#b14cff"
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
      <Tabs.Screen name="index" options={{title: "Filmes"}}/>
      <Tabs.Screen name="ingressos" options={{title: "Ingressos"}}/>
      <Tabs.Screen name="cinemas" options={{title: "Cinemas"}}/>
      <Tabs.Screen name="perfil" options={{title: "Perfil"}}/>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2f1746',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 60,

  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'left',
    marginBottom:10,
  },
  pesquisaInput: {
    backgroundColor: '#0b0712',
    borderRadius: 18,
    padding: 10,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: '#171305',
    width: '30%',
  },
});