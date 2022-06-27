import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import * as  React from 'react';
import { InputCustom } from '../components/InputCustom';
import { InputDatePickerCustom } from '../components/InputDatePickerCustom';
import { InputSelectCustom } from '../components/InputSelectCustom';
import { convertDate, convertDateUtz, currencyToNumber, numberToCurrency } from '../utils/convert';
// Formulaire
import { useForm, Controller } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// Realm BDD
import Realm from "realm";
import uuid from 'react-native-uuid';


// ------- Formulaire
type FormValues = {
    name: string;
    amount: string;
    date: string;
    category: string;
    comment: string;
    operation: 'income' | 'expense';
}
interface IForm {
    formType: 'income' | 'expense';
}

export const Form = ({ formType }:IForm) => {
console.log(uuid.v4());
    const validationSchema = Yup.object({
        name: Yup.string().required('Veuillez saisir vos nom et prénom'),
        amount: Yup.number().required('Veuillez saisir un montant'),
        date: Yup.string().required("Veuillez saisir la date de l'opération"),
        category: Yup.string().required('Veuillez choisir une catégorie'),
        comment: Yup.string(),
        operation: Yup.string(),
    });

    // React Hook Form
    // useForm prends en paramètre un résolver (nécessite librairie)
    // - control permet de wraper les champs avec React Tool Form
    // - handleSubmit pour submit le form
    // - formState pour savoir où en est le state et récupérer les erreurs
    // formValue pour que le useForm connaisse bien les types des champs
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
        defaultValues: { 
            operation: formType
        } // utile pour simuler un champ hidden qui précise si je fais un income ou expense
    })

    const onSubmit: any = (data: FormValues) => {
        console.log('---data----');
        console.log(data);
        let realm: Realm;
        // Déclaration du schéma
        realm = new Realm({
            path: 'UserDatabase.realm',
            schema: [
                {
                    // properties comment : ajout valeur par défaut car si cette propriété
                    // n'est pas renseignée elle est absente de data
                    name: "Operation",
                    properties: {
                        //name: "string",
                        _id: "string",
                        amount: "string",
                        date: "string",
                        category: "string",
                        comment: {type: "string", default: ''},
                        type: "string"
                    }
                }
            ],
            deleteRealmIfMigrationNeeded: true
        })

        let config = realm.Configuration(
            schemaVersion: 0,
            deleteRealmIfMigrationNeeded: true
          )
          realm.Configuration.defaultConfiguration = config


        realm.write( () => {
            realm.create('Operation', {
                //name: data.name,
                _id: uuid.v4(),
                amount: numberToCurrency(data.amount.toString()),
                date: convertDateUtz(data.date),
                category: data.category,
                comment: data.comment,
                type: data.operation
            })
        })

        // Lecture des données
        let realmRead = new Realm({ path: 'UserDatabase.realm'});
        var user_details = realmRead.objects('Operation');
        console.log('----user_details----');
        console.log(user_details);

        realm.close();

/*
        // vider la BDD
        realm.write( () => {
            realm.delete(user_details)
        })
        */
    }

    return (
        <ScrollView style={styles.container}>
            {/* un Controller de React Hook Form est utilisé pour chaque champ */}
            {/* !!error : les deux !!, explications : error est de type FieldError, mais on veut qu'il devienne un booléen
                          alors pour cela on met 2 exclamations :
                          - la première pour checker si ce n'est pas défini
                          - la deuxième pour le remettre dans l'état normal pour l'autotyper en booléen
           */}
            <Controller
                control={control}
                rules={{ required: true, maxLength: 50, }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputCustom
                        value={value}
                        placeholder="* Bénéficiaire (nom, prénom)"
                        error={!!error}
                        errorDetails={error?.message}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
                name="name"
            />

            <Controller
                control={control}
                rules={{ required: true, }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputCustom
                        value={value}
                        placeholder="* Montant"
                        error={!!error}
                        errorDetails={error?.message}
                        onChangeText={onChange}
                        keyboard="numeric"
                    />
                )}
                name="amount"
            />

            <Controller
                control={control}
                rules={{ required: true, maxLength: 50, }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputDatePickerCustom
                        value={value}
                        placeholder="* Date de l'opération"
                        error={!!error}
                        errorDetails={error?.message}
                        onChangeDateCallBack={onChange}
                    />
                )}
                name="date"
            />

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                    <InputSelectCustom
                        errorDetails={error?.message}
                        onChangeText={onChange}
                        typeIncomeExpense={formType}
                    />
                )}
                name="category"
            />

            <Controller
                control={control}
                rules={{ required: true, maxLength: 50, }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <InputCustom
                        value={value}
                        placeholder="Commentaire"
                        error={!!error}
                        errorDetails={error?.message}
                        onChangeText={onChange}
                    />
                )}
                name="comment"
            />

            <Text style={{ marginVertical: 20 }}>* Veuillez remplir tous les champs obligatoires</Text>

            <View style={{ alignItems: 'center' }}>
                <Pressable onPress={handleSubmit(onSubmit)} style={styles.pressable}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Ajouter</Text>
                    </View>
                </Pressable>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    pressable: {
        width: '60%',
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
    },
    txtError: {
        color: '#ac0000',
    }
})
