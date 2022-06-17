import { View, Text } from 'react-native';
import * as React from 'react';
import { DataTable, Provider } from 'react-native-paper';
import { data } from '../datas/data';
import { IData, IExpenses, IIncomes } from '../interfaces/IData';
import { date } from 'yup';
import Moment from "moment"; // Moment(date).format("DD/MM/YYYY")
import 'intl';
import 'intl/locale-data/jsonp/fr';

const numberOfItemsPerPageList = [2, 3, 4];

export const AccountsScreen: React.FC<any> = ({ navigation }: any): JSX.Element => {

    // Récupère les données incomes et expenses associées à un user
    // flat l'ensemble et tri par date desc.
    // opération à faire au préalable afin de pouvoir faire 
    // un map final sur ce tableau reconstitué et trié.
    const datas = data.filter(value => {
        if (value._id === '18c79361-d05f-437b-9909-685db8d4910a') {
            return value;
        }
    }).map((value: IData) =>
        value.incomes.map((item: IIncomes) => item)
            .concat(value.expenses.map((item: IExpenses) => item))
    ).flat(1).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

    // Converti une monnaie string en number (depuis fichier data) : €3,547.91 => 3541.91
    const currencyToNumber = (currency: string) => Number(currency.replace(/[^0-9.-]+/g,""));

    // Converti une monnaie number en string : 3541.91 => 3 547,91 €
    let euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });
    const numberToCurrency = (price: number): string => euro.format(price);

    // Total des revenus
    const incomesTotal: number = datas.filter(value => {
        if (value.hasOwnProperty('_id_income')) {
            return value.amount;
        }
    }).reduce( (accu, a) => (accu + currencyToNumber(a.amount)), 0);

    // Total des dépenses
    const expensesTotal: number = datas.filter(value => {
        if (value.hasOwnProperty('_id_expense')) {
            return value.amount;
        }
    }).reduce( (accu, a) => (accu + currencyToNumber(a.amount)), 0);

    // Solde, les revenus - les dépenses
    const solde: number = incomesTotal - expensesTotal;

    // Formatage des dates : 2021-05-26T01:52:50.288Z => 26/05/2021
    const converDate = (date: string): string => Moment(date).format("DD/MM/YYYY");

    // Pagination
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, datas.length);
    
    React.useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <View>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>Revenus</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{fontWeight: 'bold'}}>{numberToCurrency(incomesTotal)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Dépenses</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{color: 'red', fontWeight: 'bold'}}>{numberToCurrency(expensesTotal)}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Solde</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={{color: solde >= 0 ? 'black' : 'red', fontWeight: 'bold'}}>{numberToCurrency(solde)}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>

            <DataTable style={{ marginTop: 10 }}>
                <DataTable.Header style={{backgroundColor: '#ffe3d2'}}>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Category</DataTable.Title>
                    <DataTable.Title>Amount</DataTable.Title>
                </DataTable.Header>
                {
                    datas.map((value: IIncomes | IExpenses, index: number) => {
                        return (
                            <DataTable.Row key={index} style={{backgroundColor: index % 2 === 0 ? '#fefefe': '#f4f4f4'}}>
                                <DataTable.Cell>{converDate(value.date)}</DataTable.Cell>
                                <DataTable.Cell>{value.category}</DataTable.Cell>
                                <DataTable.Cell textStyle={{ color: value.hasOwnProperty('_id_income') ? 'black' : 'red' }}>
                                    {numberToCurrency(currencyToNumber(value.amount))}
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(datas.length / numberOfItemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} / ${datas.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Lignes par page'}
                />
            </DataTable>

        </View>
    );
}
