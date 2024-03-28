import React, { useEffect, useState } from "react";
import BarChart from "../../generic/Chart/BarChart";
import { ApiStatsService, AnnualValuesByCategoryForMonth } from "../../../services/apiStatsService";
import { formatDateToLocalISO, getMonthFrByYearMonth } from "../../../utils/generic/dateUtils";
import { useApp } from "../../../context/AppContext";

interface AnnualMonthlyExpensesByBudgetChartProps {
  startDate: Date;
  endDate: Date;
  financialCategoryId?: number;
  bankAccountId?: number;
}

const AnnualMonthlyExpensesByBudgetChart: React.FC<AnnualMonthlyExpensesByBudgetChartProps> = ({
  startDate,
  endDate,
  financialCategoryId,
  bankAccountId,
}) => {
  const [dataExpensesByBudgetByMonth, setDataExpensesByBudgetByMonth] = useState<any>();
  const [reload, setReload] = useState<boolean>(false);
  const { profileSelection } = useApp();

  const fetchData = async () => {
    const apiService = new ApiStatsService();
    const annualValues = await apiService.getAnnualExpensesByCategoryByMonth(
      formatDateToLocalISO(startDate),
      formatDateToLocalISO(endDate),
      financialCategoryId,
      bankAccountId
    );
    transformData(annualValues);
  };

  const transformData = (annualValues: AnnualValuesByCategoryForMonth[]) => {
    const transformedData: any = {
      labels: {
        y: "Budget €",
        x: "Mois",
      },
      data: {},
    };

    annualValues.forEach((monthData) => {
      const month = getMonthFrByYearMonth(monthData.month);
      transformedData.data[month] = transformedData.data[month] || {};
      monthData.datas.forEach((categoryData) => {
        const category = categoryData.category || "Non catégorisé";
        transformedData.data[month][category] = categoryData.amount < 0 ? -categoryData.amount : categoryData.amount;
      });
    });

    setDataExpensesByBudgetByMonth(transformedData);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, financialCategoryId, bankAccountId]);
  
  useEffect(() => {
    if (profileSelection !== undefined) {
      setReload(true);
    }
  }, [profileSelection]);
  
  useEffect(() => {
    if(reload){
      fetchData();
      setReload(false);
    }
  }, [reload]);

  return dataExpensesByBudgetByMonth ? (
    <BarChart
      data={dataExpensesByBudgetByMonth}
      title="Dépenses mensuelles par catégorie"
    />
  ) : null;
};

export default AnnualMonthlyExpensesByBudgetChart;
