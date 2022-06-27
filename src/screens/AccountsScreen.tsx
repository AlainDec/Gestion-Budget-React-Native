import { View, ScrollView } from 'react-native';
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { data } from '../datas/data';
import { IIncomesExpenses } from '../interfaces/IData';
import { date } from 'yup';
import 'intl';
import 'intl/locale-data/jsonp/fr';
import { convertDate, currencyToNumber, numberToCurrency } from '../utils/convert';
import { getFilteredDatas, getTotalIncomes, getTotalExpenses } from '../utils/filterDatas';

export const AccountsScreen: React.FC<any> = ({ navigation, route }: any): JSX.Element => {

    // Récupère les données incomes et expenses associées à un user
    // flat l'ensemble et tri par date desc.
    // opération à faire au préalable afin de pouvoir faire 
    // un map final sur ce tableau reconstitué et trié.
    let datas: IIncomesExpenses[] = getFilteredDatas(data, '18c79361-d05f-437b-9909-685db8d4910a');

    console.log(datas);

    // Total des revenus
    const incomesTotal: number = getTotalIncomes(datas);

    // Total des dépenses
    const expensesTotal: number = getTotalExpenses(datas);

    // Solde, les revenus - les dépenses
    const solde: number = incomesTotal - expensesTotal;

    return (
        <View>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Revenus</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ fontWeight: 'bold' }}>{numberToCurrency(incomesTotal)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Dépenses</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ color: 'red', fontWeight: 'bold' }}>{numberToCurrency(expensesTotal)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Solde</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{ color: solde >= 0 ? 'black' : 'red', fontWeight: 'bold' }}>{numberToCurrency(solde)}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>

            <DataTable style={{ marginTop: 10 }}>
                <DataTable.Header style={{ backgroundColor: '#ffe3d2' }}>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Opération</DataTable.Title>
                    <DataTable.Title numeric>Montant</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {
                        datas.map((value: IIncomesExpenses, index: number) => {
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
                    }
                </ScrollView>
            </DataTable>

        </View>
    );
}
