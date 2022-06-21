import { Text, View, Button, ScrollView, StyleSheet, Pressable } from "react-native";
import * as  React from 'react';
import { InputCustom } from '../components/InputCustom';
import { InputDatePickerCustom } from '../components/InputDatePickerCustom';
import { InputSelectCustom } from '../components/InputSelectCustom';

import { useForm, Controller } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  name: string;
  amount: string;
  date: string;
  category: string;
  comment: string;
  operation: 'income';
}

export const IncomeScreen: React.FC<any> = ({ navigation, route }: any): JSX.Element => {

  const { userId } = route.params;

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
    defaultValues: { operation: 'income' } // utile pour simuler un champ hidden qui précise si je fais un income ou expense
  })

  const onSubmit: any = (data: FormValues) => {
    console.log(data);
    /*navigation.navigate('Comptes', {
      datas: data
    });*/
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
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
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
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
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
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
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
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
          <InputSelectCustom
            errorDetails={error?.message}
            onChangeText={onChange}
            typeIncomeExpense='income'
          />
        )}
        name="category"
      />

      <Controller
        control={control}
        rules={{ required: true, maxLength: 50, }}
        render={({ field: { onChange, onBlur, value }, fieldState: {error} }) => (
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

      <Text style={{marginVertical: 20}}>* Veuillez remplir tous les champs obligatoires</Text>
      
      <View style={{alignItems: 'center'}}>
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
  },
  txtError: {
    color: '#ac0000',
  }
})
