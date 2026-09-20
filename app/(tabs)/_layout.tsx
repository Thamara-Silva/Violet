import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => (
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/imgs/Violet.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            <View style={styles.pesquisaContainer}>
              <Ionicons name="search" size={18} color="#b794f6" />
              <TextInput
                placeholder="Buscar filmes..."
                placeholderTextColor="#8a7aa3"
                style={styles.pesquisaInput}
              />
            </View>
          </View>
        ),

        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#c084fc',
        tabBarInactiveTintColor: '#8a7aa3',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Filmes',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'film' : 'film-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ingressos"
        options={{
          title: 'Ingressos',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'ticket' : 'ticket-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pagamento"
        options={{
          title: 'Pagamento',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'card' : 'card-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2f1746',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  headerLogo: {
    width: 130,
    height: 80,
  },

  pesquisaContainer: {
    flex: 1,
    height: 42,
    backgroundColor: '#1f1030',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#3d2360',
  },

  pesquisaInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    paddingVertical: 0,
  },

  tabBar: {
    backgroundColor: '#2f1746',
    height: 70,
    paddingBottom: 10,
    paddingTop: 5,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});