import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { theme } from '../theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!username || !password) {
      Alert.alert('Missing', 'Enter username and password to continue.');
      return;
    }
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        placeholder="Username" placeholderTextColor="#9ca3af"
        value={username} onChangeText={setUsername} style={styles.input}
      />
      <TextInput
        placeholder="Password" placeholderTextColor="#9ca3af" secureTextEntry
        value={password} onChangeText={setPassword} style={styles.input}
      />
      <Pressable onPress={onLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.replace('Welcome')} style={styles.link}>
        <Text style={styles.linkText}>Back to Welcome</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: 24, justifyContent: 'center' },
  title: { color: theme.text, fontSize: 28, fontWeight: '800', marginBottom: 20 },
  input: { backgroundColor: theme.card, borderRadius: 14, padding: 14, color: theme.text, borderWidth: 1, borderColor: '#1f2937', marginBottom: 12 },
  btn: { backgroundColor: theme.primary, padding: 14, borderRadius: 14, marginTop: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  link: { marginTop: 16, alignSelf: 'center' },
  linkText: { color: theme.subtext }
});