import { IData, IExpenses, IIncomes, IIncomesExpenses } from '../interfaces/IData';
import { currencyToNumber } from './convert';
import Moment from "moment"; // Moment(date).format("DD/MM/YYYY")


// Récupère les données incomes et expenses associées à un user
// flat l'ensemble et tri par date desc.
// opération à faire au préalable afin de pouvoir faire 
// un map final sur ce tableau reconstitué et trié.
export const getFilteredDatas = (data: IData[], userId: string) => {
    return data.filter((value: IData) => {
        if (value._id === userId) {
            return value;
        }
    }).map((value: IData) =>
        value.incomes.map(
            item => {
                let t: IIncomesExpenses = {
                    date: item.date,
                    comments: item.comments,
                    amount: item.amount,
                    category: item.category,
                    _id: item._id_income,
                    type: "income"
                }
                return t
            }).concat(value.expenses.map(
                item => {
                    let t: IIncomesExpenses = {
                        date: item.date,
                        comments: item.comments,
                        amount: item.amount,
                        category: item.category,
                        _id: item._id_expense,
                        type: "expense"
                    }
                    return t
                }
            ))
    ).flat(1).sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}


// Total des revenus
export const getTotalIncomes = (data: IIncomesExpenses[]): number => {
    return data.filter(value => {
        if (value.type === 'income') {
            return value.amount;
        }
    }).reduce((accu, a) => (accu + currencyToNumber(a.amount)), 0);
}


// Total des dépenses
export const getTotalExpenses = (data: IIncomesExpenses[]): number => {
    return data.filter(value => {
        if (value.type === 'expense') {
            return value.amount;
        }
    }).reduce((accu, a) => (accu + currencyToNumber(a.amount)), 0);
}
