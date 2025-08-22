import AsyncStorage from '@react-native-async-storage/async-storage';


const KEY = 'TASKS_V1';

export async function getTasks() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('read error', e);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('save error', e);
  }
}
