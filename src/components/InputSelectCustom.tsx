import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker"

interface InputSelectCustomProps {
    onChangeText: (value: string) => void;
    errorDetails?: string;
    typeIncomeExpense: 'income' | 'expense';
}
type TCategory ={
    code : string,
    label :string
}

const categoriesIncome: TCategory[] = [
    {code:"sal_ass", label:"Salaire et assimilé"},
    {code:"rev_fin", label:"Revenu financier"},
    {code:"ren",     label:"Rente"},
    {code:"pen_ali", label:"Pension alimentaire"},
    {code:"all_cho", label:"Allocation chômage"},
    {code:"pre_soc", label:"Prestations sociales"},
    {code:"rev_fon", label:"Revenu foncier"},
    {code:"rev_exc", label:"Revenu exceptionnel"},
    {code:"aut_rev", label:"Autre revenu"},
];

const categoriesExpense: TCategory[] = [
    {code:"ali", label:"Alimentaire"},
    {code:"fac", label:"Factures"},
    {code:"tra", label:"Transport"},
    {code:"log", label:"Logement"},
    {code:"san", label:"Santé"},
    {code:"div", label:"Divertissement"},
    {code:"vac", label:"Vacances"},
    {code:"sho", label:"Shopping"},
];

export const InputSelectCustom: React.FC<InputSelectCustomProps> = ({
    onChangeText,
    errorDetails,
    typeIncomeExpense
}) => {
    
    const [category, setCategory] = useState<string>("")

    let categoriesSelect = typeIncomeExpense === 'income' ? categoriesIncome : categoriesExpense;

    const setTheCategory = (category: string) => {
        setCategory(category);
        onChangeText(category);
    }

    return (
        <View>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => {
                    setTheCategory(itemValue)
                }}
                style={styles.inputBase}>
                <Picker.Item label="Catégorie" value="" enabled={false} color="#aaa" style={{fontSize:14}} />
                {
                    categoriesSelect.map( (value) => {
                        return (
                            <Picker.Item
                                key={value.code}
                                label={value.label}
                                value={value.code}
                            />
                        )
                    })
                }
            </Picker>
            {!!errorDetails && (
                <Text style={styles.txtError}>{errorDetails}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputBase: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    input: {
        borderWidth: 0,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#ac0000',
    },
    txtError: {
      color: '#ac0000',
    }
});
