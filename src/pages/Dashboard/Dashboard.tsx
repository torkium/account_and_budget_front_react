import { FormProvider, useForm } from "react-hook-form";
import FinancialCategorySelect from "../../components/FinancialCategory/Forms/FinancialCategorySelect";
import "./Dashboard.css";
import PeriodNavigator from "../../components/Period/PeriodNavigator";
import { useState } from "react";
import { endOfYear, startOfYear } from "date-fns";
import AnnualMonthlyExpensesIncomeChart from "../../components/Chart/AnnualMonthlyExpensesIncomeChart/AnnualMonthlyExpensesIncomeChart";
import AnnualMonthlyExpensesByBudgetChart from "../../components/Chart/AnnualMonthlyExpensesByBudgetChart/AnnualMonthlyExpensesByBudgetChart";
import AnnualExpensesByBudgetChart from "../../components/Chart/AnnualExpensesByBudgetChart/AnnualExpensesByBudgetChart";

function Dashboard() {
  const [startDate, setStartDate] = useState<Date>(startOfYear(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfYear(new Date()));

  const methods = useForm();
  return (
    <>
      <PeriodNavigator
        mode="year"
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <div className="dashboard-container">
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualMonthlyExpensesIncomeChart startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

/*

        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualMonthlyExpensesByBudgetChart startDate={startDate} endDate={endDate} />
          </div>
          <div className="chart-filter">
            <FormProvider {...methods}>
              <FinancialCategorySelect
                name="financialCategoryFilter"
                label=""
                emptyLabel="Toutes les catégories"
              />
            </FormProvider>
          </div>
        </div>
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualExpensesByBudgetChart startDate={startDate} endDate={endDate} />
          </div>
          <div className="chart-filter">
            <FormProvider {...methods}>
              <FinancialCategorySelect
                name="financialCategoryFilter"
                label=""
                emptyLabel="Toutes les catégories"
              />
            </FormProvider>
          </div>
        </div>
        */