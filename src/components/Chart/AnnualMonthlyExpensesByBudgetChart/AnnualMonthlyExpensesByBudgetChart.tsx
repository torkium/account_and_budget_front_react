import React from "react";
import BarChart from "../BarChart";

interface AnnualMonthlyExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
}

const AnnualMonthlyExpensesByBudgetChart: React.FC<AnnualMonthlyExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
}) => {

  const dataExpensesByBudgetByMonth = {
    labels: {
      y: "Budget €",
      x: "Mois",
    },
    colors: ["#ff0000", "#00ff00", "#f1e15b"],
    data: {
      Janvier: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Février: {
        Alimentation: 400,
        Logement: 800,
        Transport: 150,
      },
      Mars: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Avril: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Mai: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Juin: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Juillet: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Août: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Septembre: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Octobre: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Novembre: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
      Décembre: {
        Alimentation: 200,
        Logement: 800,
        Transport: 150,
      },
    },
  };

  return (
    <BarChart
      data={dataExpensesByBudgetByMonth}
      title="Dépenses mensuelles par catégorie"
    />
  );
};

export default AnnualMonthlyExpensesByBudgetChart;
