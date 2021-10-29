import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet } from 'react-native';

const request = async (callback) => {
  const response = await fetch(
    'https://covid19-brazil-api.vercel.app/api/report/v1/'
  );
  const parsed = await response.json();
  callback(parsed.data);
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);
  return (
    <View style={estilo.container}>
      <View>
        <Text style={estilo.titulo}> Covid 19 no Brasil </Text>
      </View>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.uid.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Text style={estilo.itens}>
            {' '}UF: {item.uf} {"\n"} Estado: {item.state} {"\n"} Casos: {item.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{' '}
          </Text>
        )}
      />
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#505",
  },
  titulo: {
    fontSize: 30,
    color: "#FF0",
    marginVertical: 25,
    textAlign: 'center',
  },
  itens: {
    color: "#FFF",
    textAlign: 'center',
    backgroundColor: "#055",
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 3,
    textAlignVertical: 'center',    
    
  },

});