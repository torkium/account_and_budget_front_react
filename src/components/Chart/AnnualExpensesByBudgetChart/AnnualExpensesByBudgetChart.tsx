import React, { useEffect, useState } from "react";
import PieChart from "../PieChart";
import { ApiStatsService } from "../../../services/apiStatsService";
import { formatDateToLocalISO } from "../../../utils/dateUtils";

interface AnnualExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
  financialCategoryId?: number;
  bankAccountId?: number;
}

const AnnualExpensesByBudgetChart: React.FC<AnnualExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
  financialCategoryId,
  bankAccountId,
}) => {
  const [spendingData, setSpendingData] = useState<any>({ data: [], colors: [] });

  const fetchData = async () => {
    const apiService = new ApiStatsService();
    const annualValues = await apiService.getAnnualExpensesByCategory(
      formatDateToLocalISO(startDate),
      formatDateToLocalISO(endDate),
      financialCategoryId,
      bankAccountId
    );
    transformData(annualValues);
  };

  const transformData = (annualValues: any[]) => {
    const transformedData = {
      data: annualValues.map(({ category, amount }) => ({
        id: category || "Non catégorisé",
        value: amount < 0 ? -amount : amount,
      })),
    };

    setSpendingData(transformedData);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, financialCategoryId, bankAccountId]);

  return (
    <PieChart
      data={spendingData}
      title="Répartition des dépenses annuelles par catégorie"
    />
  );
};

export default AnnualExpensesByBudgetChart;
