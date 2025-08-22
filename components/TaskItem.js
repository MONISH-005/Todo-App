import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.content}>
        <View style={[styles.status, task.done && { backgroundColor: theme.success }]} />
        <View style={styles.texts}>
          <Text style={[styles.title, task.done && styles.done]} numberOfLines={1}>{task.title}</Text>
          {task.description ? (
            <Text style={styles.desc} numberOfLines={2}>{task.description}</Text>
          ) : null}
          {task.date ? <Text style={styles.meta}>Due: {task.date} • {task.priority}</Text> : <Text style={styles.meta}>{task.priority}</Text>}
        </View>
      </Pressable>
      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(task)} style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(task.id)} style={[styles.actionBtn, styles.delete]}>
          <Text style={styles.actionText}>Del</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  content: { flexDirection: 'row', alignItems: 'flex-start' },
  status: {
    width: 18, height: 18, borderRadius: 9,
    marginTop: 4,
    backgroundColor: '#374151', // gray-700
    marginRight: 12
  },
  texts: { flex: 1 },
  title: { color: theme.text, fontSize: 16, fontWeight: '700' },
  desc: { color: theme.subtext, marginTop: 2 },
  meta: { color: theme.subtext, marginTop: 6, fontSize: 12 },
  done: { textDecorationLine: 'line-through', color: theme.subtext },
  actions: { flexDirection: 'row', marginTop: 10, gap: 8 },
  actionBtn: {
    backgroundColor: theme.muted, paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 12
  },
  delete: { backgroundColor: '#3f1d1d' },
  actionText: { color: theme.text, fontWeight: '600', fontSize: 12 }
});