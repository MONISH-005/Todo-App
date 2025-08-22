import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { getTasks, saveTasks } from '../storage/tasks';
import TaskItem from '../components/TaskItem';
import { theme } from '../theme';
import { v4 as uuidv4 } from 'uuid';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const load = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const persist = async (next) => {
    setTasks(next);
    await saveTasks(next);
  };

  const onAdd = () => {
    navigation.navigate('EditTask', { onSave: (t) => {
      const newTask = { id: uuidv4(), done: false, ...t };
      persist([newTask, ...tasks]);
    }});
  };

  const onEdit = (task) => {
    navigation.navigate('EditTask', { task, onSave: (t) => {
      const next = tasks.map(x => x.id === task.id ? { ...x, ...t } : x);
      persist(next);
    }});
  };

  const onToggle = (id) => {
    const next = tasks.map(x => x.id === id ? { ...x, done: !x.done } : x);
    persist(next);
  };

  const onDelete = (id) => {
    Alert.alert('Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => persist(tasks.filter(t => t.id !== id)) }
    ]);
  };

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hi}>Your tasks</Text>
        <Text style={styles.meta}>{remaining} remaining</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <Pressable onPress={onAdd} style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: 16 },
  header: { marginTop: 6, marginBottom: 12 },
  hi: { color: theme.text, fontSize: 28, fontWeight: '900' },
  meta: { color: theme.subtext, marginTop: 4 },
  fab: {
    position: 'absolute', bottom: 24, right: 24, height: 56, width: 56, borderRadius: 28,
    backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, elevation: 6
  },
  fabText: { color: '#fff', fontSize: 30, fontWeight: '900', marginTop: -2 }
});