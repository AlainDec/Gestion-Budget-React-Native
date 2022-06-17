export interface IData {
    _id: string,
    user: string,
    incomes: IIncomes[],
    expenses: IExpenses[],
}

export interface IIncomes {
    date: string,
    amount: string,
    category: string,
    comments: string,
    _id_income?: string
}

export interface IExpenses {
    date: string,
    amount: string,
    category: string,
    comments: string,
    _id_expense?: string
}
