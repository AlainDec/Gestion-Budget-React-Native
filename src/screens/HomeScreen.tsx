import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as React from 'react';

export const HomeScreen: React.FC<any> = ({ navigation }: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Revenus')} style={styles.pressable}>
        <View style={styles.button}>
          <Text style={styles.text}>Ajouter un Revenu</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Dépenses')} style={styles.pressable}>
        <View style={styles.button}>
          <Text style={styles.text}>Ajouter une Dépense</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressable: {
    width:'60%',
  },
  button: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'tomato',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  }
})