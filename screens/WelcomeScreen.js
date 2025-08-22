import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TODO</Text>
      <Text style={styles.subtitle}>Organize your day with a clean, modern task manager.</Text>
      <Pressable onPress={() => navigation.replace('Login')} style={styles.btn}>
        <Text style={styles.btnText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 48, color: theme.text, fontWeight: '900', letterSpacing: 8 },
  subtitle: { marginTop: 12, color: theme.subtext, textAlign: 'center' },
  btn: { marginTop: 28, backgroundColor: theme.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});