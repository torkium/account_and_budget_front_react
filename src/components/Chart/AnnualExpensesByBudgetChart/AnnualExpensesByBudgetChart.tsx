import React from "react";
import PieChart from "../PieChart";

interface AnnualExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
}

const AnnualExpensesByBudgetChart: React.FC<AnnualExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
}) => {

  const spendingData = {
    data: [
      { id: "Alimentation", value: 600 },
      { id: "Logement", value: 1200 },
      { id: "Transport", value: 300 },
      { id: "Loisirs", value: 200 },
      { id: "Autres", value: 100 },
    ],
    colors: ["#f47560", "#e8c1a0", "#f1e15b", "#97e3d5", "#61cdbb"],
  };

  return (
    <PieChart data={spendingData} title="Répartition par catégorie" />
  );
};

export default AnnualExpensesByBudgetChart;
