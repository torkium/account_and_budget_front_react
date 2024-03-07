import React, { useEffect, useState } from "react";
import PieChart from "../PieChart";
import { ApiStatsService } from "../../../services/apiStatsService";
import { formatDateToLocalISO } from "../../../utils/dateUtils";

interface AnnualExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
  financialCategoryId?: number;
}

const AnnualExpensesByBudgetChart: React.FC<AnnualExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
  financialCategoryId,
}) => {
  const [spendingData, setSpendingData] = useState<any>({ data: [], colors: [] });

  const fetchData = async (financialCategoryId?: number) => {
    const apiService = new ApiStatsService();
    const annualValues = await apiService.getAnnualExpensesByCategory(
      formatDateToLocalISO(startDate),
      formatDateToLocalISO(endDate),
      financialCategoryId
    );
    transformData(annualValues);
  };

  const transformData = (annualValues: any[]) => {
    const transformedData = {
      data: annualValues.map(({ category, amount }) => ({
        id: category || "Non catégorisé",
        value: amount < 0 ? -amount : amount,
      })),
      colors: ["#f47560", "#e8c1a0", "#f1e15b", "#97e3d5", "#61cdbb"],
    };

    setSpendingData(transformedData);
  };

  useEffect(() => {
    fetchData(financialCategoryId);
  }, [startDate, endDate, financialCategoryId]);

  return (
    <PieChart
      data={spendingData}
      title="Répartition des dépenses annuelles par catégorie"
    />
  );
};

export default AnnualExpensesByBudgetChart;
