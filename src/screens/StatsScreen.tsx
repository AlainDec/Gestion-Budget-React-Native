import { View, Text, Dimensions } from 'react-native';
import * as  React from 'react';
import {
  LineChart,
  PieChart,
} from "react-native-chart-kit";
import { data } from '../datas/data';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { IIncomesExpenses } from '../interfaces/IData';
import { convertDate, currencyToNumber, numberToCurrency } from '../utils/convert';
import { getFilteredDatas, getTotalIncomes, getTotalExpenses } from '../utils/filterDatas';

const screenWidth = Dimensions.get("window").width;

const datas: IIncomesExpenses[] = getFilteredDatas(data, '18c79361-d05f-437b-9909-685db8d4910a');

const getRandomColor = () => Math.round(Math.random() * 255);

type IOperation = 'income' | 'expense';

interface IPieChart {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
// Capture les data filtrées
const getDataPieChart = (datas: IIncomesExpenses[], operation: IOperation): IPieChart[] => {
  return datas.filter(value => {
    if (value.type === operation) {
      return value;
    }
  }).map(value => {
    let item = {
      name: value.category,
      amount: Math.round(currencyToNumber(value.amount)),
      color: "rgba(" + getRandomColor() + ", " + getRandomColor() + ", " + getRandomColor() + ", 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
    return item;
  })
}

const dataPieChartIncomes = getDataPieChart(datas, 'income');
const dataPieChartExpenses = getDataPieChart(datas, 'expense');


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export const StatsScreen: React.FC<any> = ({ navigation }: any): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>

      <PieChart
        data={dataPieChartIncomes}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[10, 10]}
        absolute
      />

      <PieChart
        data={dataPieChartExpenses}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[10, 10]}
        absolute
      />
      {/*
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      */}
    </View>
  );
}
