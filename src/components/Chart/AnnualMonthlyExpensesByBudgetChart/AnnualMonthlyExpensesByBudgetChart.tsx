import React, { useEffect, useState } from "react";
import BarChart from "../BarChart";
import { ApiStatsService, AnnualValuesByCategoryForMonth } from "../../../services/apiStatsService";
import { formatDateToLocalISO, getMonthFrByYearMonth } from "../../../utils/dateUtils";

interface AnnualMonthlyExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
  financialCategoryId?: number;
}

const AnnualMonthlyExpensesByBudgetChart: React.FC<AnnualMonthlyExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
  financialCategoryId,
}) => {
  const [dataExpensesByBudgetByMonth, setDataExpensesByBudgetByMonth] = useState<any>();

  const fetchData = async (financialCategoryId?: number) => {
    const apiService = new ApiStatsService();
    const annualValues = await apiService.getAnnualValuesByCategoryByMonth(
      formatDateToLocalISO(startDate),
      formatDateToLocalISO(endDate),
      financialCategoryId
    );
    transformData(annualValues);
  };

  const transformData = (annualValues: AnnualValuesByCategoryForMonth[]) => {
    const transformedData: any = {
      labels: {
        y: "Budget €",
        x: "Mois",
      },
      colors: ["#ff0000", "#00ff00", "#f1e15b"],
      data: {},
    };

    annualValues.forEach((monthData) => {
      const month = getMonthFrByYearMonth(monthData.month);
      transformedData.data[month] = transformedData.data[month] || {};
      monthData.datas.forEach((categoryData) => {
        const category = categoryData.category || "Non catégorisé";
        transformedData.data[month][category] = categoryData.amount;
      });
    });

    setDataExpensesByBudgetByMonth(transformedData);
  };

  useEffect(() => {
    fetchData(financialCategoryId);
  }, [startDate, endDate, financialCategoryId]);

  return dataExpensesByBudgetByMonth ? (
    <BarChart
      data={dataExpensesByBudgetByMonth}
      title="Transactions mensuelles par catégorie"
    />
  ) : null;
};

export default AnnualMonthlyExpensesByBudgetChart;
