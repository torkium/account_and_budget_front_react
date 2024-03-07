import React, { useEffect, useState } from "react";
import LineChart, { SimpleChartData } from "../LineChart";
import {
  AnnualExpensesForMonth,
  AnnualIncomesForMonth,
  ApiStatsService,
} from "../../../services/apiStatsService";
import {
  formatDateToLocalISO,
  getMonthFrByYearMonth,
} from "../../../utils/dateUtils";

interface AnnualMonthlyExpensesIncomeChartProps {
  startDate: Date;
  endDate: Date;
}

type DataStructure = {
  [key: string]: {
    Dépenses: number;
    Revenus: number;
  };
};
const AnnualMonthlyExpensesIncomeChart: React.FC<AnnualMonthlyExpensesIncomeChartProps> = ({ startDate, endDate }) => {
  const [incomes, setIncomes] = useState<AnnualIncomesForMonth[]>([]);
  const [expenses, setExpenses] = useState<AnnualExpensesForMonth[]>([]);
  const [datas, setDatas] = useState<SimpleChartData>();

  const getIncomes = async function () {
    setIncomes(
      await new ApiStatsService().getAnnualIncomesByMonth(
        formatDateToLocalISO(startDate),
        formatDateToLocalISO(endDate)
      )
    );
  };
  const getExpenses = async function () {
    setExpenses(
      await new ApiStatsService().getAnnualExpensesByMonth(
        formatDateToLocalISO(startDate),
        formatDateToLocalISO(endDate)
      )
    );
  };

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [startDate, endDate]);

  useEffect(() => {
    const datasByMonth: DataStructure = {
      Janvier: { Dépenses: 0, Revenus: 0 },
      Février: { Dépenses: 0, Revenus: 0 },
      Mars: { Dépenses: 0, Revenus: 0 },
      Avril: { Dépenses: 0, Revenus: 0 },
      Mai: { Dépenses: 0, Revenus: 0 },
      Juin: { Dépenses: 0, Revenus: 0 },
      Juillet: { Dépenses: 0, Revenus: 0 },
      Août: { Dépenses: 0, Revenus: 0 },
      Septembre: { Dépenses: 0, Revenus: 0 },
      Octobre: { Dépenses: 0, Revenus: 0 },
      Novembre: { Dépenses: 0, Revenus: 0 },
      Décembre: { Dépenses: 0, Revenus: 0 },
    };

    incomes.forEach((result) => {
      const frenchMonth = getMonthFrByYearMonth(result.month);
      if (datasByMonth[frenchMonth]) {
        datasByMonth[frenchMonth].Revenus = result.amount;
      }
    });

    expenses.forEach((result) => {
      const frenchMonth = getMonthFrByYearMonth(result.month);
      if (datasByMonth[frenchMonth]) {
        datasByMonth[frenchMonth].Dépenses = -result.amount;
      }
    });

    setDatas({
      labels: {
        y: "Montant (€)",
        x: "Mois",
      },
      colors: ["#ff6961", "#77dd77"],
      data: datasByMonth,
    });
  }, [incomes, expenses]);

  return datas ? <LineChart data={datas} title="Dépenses et revenus mensuels" /> : null;
};

export default AnnualMonthlyExpensesIncomeChart;
