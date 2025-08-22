import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-datetimepicker/datetimepicker';
import { theme } from '../theme';

export default function EditTaskScreen({ navigation, route }) {
  const { onSave, task } = route.params || {};
  const isEditing = !!task;
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [date, setDate] = useState(task?.date ? new Date(task.date) : null);
  const [priority, setPriority] = useState(task?.priority ?? 'Medium');
  const [showPicker, setShowPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Edit Task' : 'New Task' });
  }, [isEditing]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Missing', 'Title is required.');
      return;
    }
    if (!date) {
      Alert.alert('Missing', 'Please select a due date.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      Alert.alert('Invalid Date', 'Due date cannot be in the past.');
      return;
    }

    onSave({ ...task, title: title.trim(), description, date: date.toISOString().split('T')[0], priority });
    navigation.goBack();
  };

  const PriorityBtn = ({ label }) => (
    <Pressable
      onPress={() => setPriority(label)}
      style={[styles.pill, priority === label && styles.pillActive]}
    >
      <Text style={[styles.pillText, priority === label && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Alert.alert('Invalid Date', 'Please choose a future date.');
      } else {
        setDate(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Task title" placeholderTextColor="#9ca3af" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Notes (optional)"
        placeholderTextColor="#9ca3af"
      />

      <Text style={styles.label}>Due Date</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={{ color: date ? theme.text : '#9ca3af' }}>
          {date ? date.toISOString().split('T')[0] : 'Select a due date'}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()} // prevents selecting past days
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        <PriorityBtn label="Low" />
        <PriorityBtn label="Medium" />
        <PriorityBtn label="High" />
      </View>

      <Pressable onPress={handleSave} style={styles.saveBtn}>
        <Text style={styles.saveText}>{isEditing ? 'Save Changes' : 'Add Task'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, padding: 16 },
  label: { color: theme.subtext, marginTop: 8, marginBottom: 6 },
  input: {
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 14,
    color: theme.text,
    borderWidth: 1,
    borderColor: '#1f2937'
  },
  row: { flexDirection: 'row', gap: 8, marginTop: 6 },
  pill: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: theme.muted, borderRadius: 999 },
  pillActive: { backgroundColor: theme.primary },
  pillText: { color: theme.subtext, fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  saveBtn: { marginTop: 18, backgroundColor: theme.primary, padding: 14, borderRadius: 14 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '800' }
});
