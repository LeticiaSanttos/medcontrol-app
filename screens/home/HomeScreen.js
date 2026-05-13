import * as React from 'react';
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import db from '../../database/database';

function HomeScreen() {

  const [medications, setMedications] = useState([]);

  //////////////////////////////////////////////////////
  // CARREGAR DADOS
  //////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////
  // SEMPRE QUE A TELA ABRIR OU VOLTAR
  //////////////////////////////////////////////////////

  useFocusEffect(
    useCallback(() => {

      loadMedications();

    }, [])
  );

  //////////////////////////////////////////////////////
  // VIEW
  //////////////////////////////////////////////////////

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Meus Medicamentos
      </Text>

      <FlatList
        data={medications}
        keyExtractor={(item) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              {item.nome}
            </Text>

            <Text style={styles.cardText}>
              💊 Dosagem: {item.dosagem}
            </Text>

            <Text style={styles.cardText}>
              ⏰ Horário: {item.horario}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

////////////////////////////////////////////////////////
// ESTILOS
////////////////////////////////////////////////////////

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50'
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#34495E'
  },

  form: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FAFAFA'
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#b5c7eb'
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2C3E50'
  },

  cardText: {
    fontSize: 14,
    color: '#555',
    marginTop: 2
  }

});

export default HomeScreen;