import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { data } from '../datas/data';
import { IIncomesExpenses } from '../interfaces/IData';
import { date } from 'yup';
import 'intl';
import 'intl/locale-data/jsonp/fr';
import { convertDate, currencyToNumber, currency2ToNumber, numberToCurrency } from '../utils/convert';
import { getFilteredDatas, getTotalIncomes, getTotalExpenses } from '../utils/filterDatas';
import Realm from "realm";
import { useIsFocused } from '@react-navigation/native';

const USER_ID = '18c79361-d05f-437b-9909-685db8d4910a';

// VERSION AVEC FICHIER

// Récupère les données incomes et expenses associées à un user
// flat l'ensemble et tri par date desc.
// opération à faire au préalable afin de pouvoir faire 
// un map final sur ce tableau reconstitué et trié.
//const datas: IIncomesExpenses[] = getFilteredDatas(data, USER_ID);

// Solde, les revenus - les dépenses
//const solde: number = getTotalIncomes(datas) - getTotalExpenses(datas);

// Les 3 dernières lignes d'opérations
//const lastDatas = datas.slice(0, 4);



// VERSION AVEC REALM

type FormValues = {
  _id: string;
  amount: string;
  category: string;
  comment: string;
  date: string;
  type: 'income' | 'expense';
}


export const HomeScreen: React.FC<any> = ({ navigation }: any): JSX.Element => {

  // Lecture des données Realm
  const realmRead = new Realm({ path: 'UserDatabase.realm' });
  const [user_details, setUser_details] = useState<(FormValues & Realm.Object)[]>()
  const [solde,setSolde] = useState<number>(0) 
  
  useEffect( () => {

    // Gestion du focus pour rafraichir la page si on revient sur la home
    const refreshOnFocus = navigation.addListener('focus', () => {

      let income = 0;
      let expense = 0;

      const datasRealm = realmRead.objects<FormValues>('Operation')
          .map(item => {
            if (item.type === 'income') {
              income += currency2ToNumber(item.amount);
            } else if (item.type === 'expense') {
              expense += currency2ToNumber(item.amount);
            }
            return item;
          })
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .splice(0, 4);
    
      // Solde, les revenus - les dépenses
      setSolde(income - expense);

      setUser_details(datasRealm)
    
      console.log("------user_details------");
      console.log(user_details);
    });

    return refreshOnFocus;

  },[navigation]);
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.accounts}>{numberToCurrency(solde)}</Text>
      </View>
      <View style={{ width: '90%' }}>
        <DataTable style={{ marginTop: 10 }}>
          <DataTable.Header style={{ backgroundColor: '#ffe3d2' }}>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Opération</DataTable.Title>
            <DataTable.Title numeric>Montant</DataTable.Title>
          </DataTable.Header>
          {
            //  LECTURE REALM
            (user_details !== undefined) && user_details.map((value, index) => {
              return (
                <DataTable.Row key={value._id} style={{ backgroundColor: index % 2 === 0 ? '#fefefe' : '#f4f4f4' }}>
                    <DataTable.Cell>{convertDate(value.date)}</DataTable.Cell>
                    <DataTable.Cell>{value.category}</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ color: value.type === 'income' ? 'black' : 'red' }}>
                        {value.amount}
                    </DataTable.Cell>
                </DataTable.Row>
            )
            })

            /* // LECTURE DU FICHIER
              lastDatas.map((value: IIncomesExpenses, index: number) => {
                  return (
                      <DataTable.Row key={index} style={{ backgroundColor: index % 2 === 0 ? '#fefefe' : '#f4f4f4' }}>
                          <DataTable.Cell>{convertDate(value.date)}</DataTable.Cell>
                          <DataTable.Cell>{value.category}</DataTable.Cell>
                          <DataTable.Cell numeric textStyle={{ color: value.type === 'income' ? 'black' : 'red' }}>
                              {numberToCurrency(currencyToNumber(value.amount))}
                          </DataTable.Cell>
                      </DataTable.Row>
                  )
              })
            */
          }
        </DataTable>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigation.navigate('Revenus', {
          userId: USER_ID
        })} style={styles.pressable}>
          <View style={styles.button}>
            <Text style={styles.text}>Ajouter un Revenu</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Dépenses', {
          userId: USER_ID
        })} style={styles.pressable}>
          <View style={styles.button}>
            <Text style={styles.text}>Ajouter une Dépense</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '80%',
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
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
  },
  accountsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
  accounts: {
    fontSize: 30,
    color: 'black' ,
    fontWeight: 'bold',
  }
})