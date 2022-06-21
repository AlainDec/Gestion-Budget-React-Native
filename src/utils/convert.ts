import { IData, IExpenses, IIncomes, IIncomesExpenses } from '../interfaces/IData';
import Moment from "moment"; // Moment(date).format("DD/MM/YYYY")


// Converti une monnaie number en string : 3541.91 => 3 547,91 €
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});
export const numberToCurrency = (price: number): string => euro.format(price);


// Converti une monnaie string en number (depuis fichier data) : €3,547.91 => 3541.91
export const currencyToNumber = (currency: string) => Number(currency.replace(/[^0-9.-]+/g, ""));


// Formatage des dates : 2021-05-26T01:52:50.288Z => 26/05/2021
export const convertDate = (date: string): string => Moment(date).format("DD/MM/YYYY");