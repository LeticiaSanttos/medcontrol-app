import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

import db from '../database/database';

export default function MedicationScreen() {

  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [horario, setHorario] = useState('');

  const [medications, setMedications] = useState([]);

  async function loadMedications() {
    try {

      const result = await db.getAllAsync(
        'SELECT * FROM medications'
      );

      setMedications(result);

    } catch (error) {
      console.log(error);
    }
  }

  async function addMedication() {

    if (!nome || !dosagem || !horario) {
      alert('Preencha todos os campos');
      return;
    }

    try {

      await db.runAsync(
        `INSERT INTO medications
        (nome, dosagem, horario)
        VALUES (?, ?, ?)`,
        [nome, dosagem, horario]
      );

      alert('Medicamento cadastrado!');

      setNome('');
      setDosagem('');
      setHorario('');

      loadMedications();

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadMedications();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Cadastro de Medicamentos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do medicamento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Dosagem"
        value={dosagem}
        onChangeText={setDosagem}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário (08:00)"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addMedication}
      >
        <Text style={styles.buttonText}>
          Salvar
        </Text>
      </TouchableOpacity>

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nome}</Text>
            <Text>{item.dosagem}</Text>
            <Text>{item.horario}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

});