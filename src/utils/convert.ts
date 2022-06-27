import moment from "moment"; // Moment(date).format("DD/MM/YYYY")
import 'moment-timezone';


// Converti une monnaie number en string : 3541.91 => 3 547,91 €
const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});
export const numberToCurrency = (price: number): string => euro.format(price);


// Converti une monnaie string en number (depuis fichier data) : €3,547.91 => 3541.91
export const currencyToNumber = (currency: string) => Number(currency.replace(/[^0-9.-]+/g, ""));

// Converti une monnaie string en number (depuis BDD Realm) : 3 541,91 € => 3541.91
export const currency2ToNumber = (currency: string) => Number(currency.replace(/[^0-9,-]+/g, "").replace(',', '.'));

// Formatage des dates : 2021-05-26T01:52:50.288Z => 26/05/2021
export const convertDate = (date: string): string => moment(date).format("DD/MM/YYYY");

// Formatage des dates : 26/05/2021 => 2021-05-26T00:00:00.000Z
export const convertDateUtz = (date: string): string => moment(date, 'DD/MM/YYYY').tz('Europe/Paris').format('YYYY-MM-DDTHH:mm:ss.000Z');
