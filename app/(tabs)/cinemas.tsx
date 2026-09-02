import { Text, View, StyleSheet } from 'react-native';

export default function IngressosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingressos</Text>
      <Text style={styles.subtitle}>Meus ingressos </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
});