import React, { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTaskList([...taskList, { id: Date.now(), text: taskInput }]);
      setTaskInput('');
    }
  };

  const deleteTask = id => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
      <Image source={require('./assets/hammer.png')} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./assets/block_and_notes.png')} style={styles.topImage} />
      <Text style={styles.title}>Lista de Tarefas</Text>
      <FlatList
        data={taskList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.taskList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa"
          value={taskInput}
          onChangeText={text => setTaskInput(text)}
        />
        <Button title="Adicionar" onPress={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  topImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  taskList: {
    flex: 1,
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});
