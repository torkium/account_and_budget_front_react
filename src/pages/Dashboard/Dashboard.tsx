import { FormProvider, useForm } from "react-hook-form";
import FinancialCategorySelect from "../../components/FinancialCategory/Forms/FinancialCategorySelect";
import "./Dashboard.css";
import PeriodNavigator from "../../components/generic/Period/PeriodNavigator";
import { useEffect, useState } from "react";
import { endOfYear, startOfYear } from "date-fns";
import AnnualMonthlyExpensesIncomeChart from "../../components/Chart/AnnualMonthlyExpensesIncomeChart/AnnualMonthlyExpensesIncomeChart";
import AnnualMonthlyExpensesByBudgetChart from "../../components/Chart/AnnualMonthlyExpensesByBudgetChart/AnnualMonthlyExpensesByBudgetChart";
import AnnualExpensesByBudgetChart from "../../components/Chart/AnnualExpensesByBudgetChart/AnnualExpensesByBudgetChart";
import BankAccountSelect from "../../components/BankAccount/Forms/BankAccountSelect";
import AnnualMonthlyBalanceChart from "../../components/Chart/AnnualMonthlyBalanceChart/AnnualMonthlyBalanceChart";

function Dashboard() {
  const [startDate, setStartDate] = useState<Date>(startOfYear(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfYear(new Date()));
  const [
    financialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart,
    setFinancialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart,
  ] = useState<number>();
  const [
    financialCategoryIdFilterForAnnualExpensesByBudgetChart,
    setFinancialCategoryIdFilterForAnnualExpensesByBudgetChart,
  ] = useState<number>();
  const [bankAccountIdFilter, setBankAccountIdFilter] = useState<number>();

  const methods = useForm();

  const watchedFinancialCategoryForAnnualMonthlyExpensesByBudgetChart =
    methods.watch(
      "financialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart"
    );
  const watchedFinancialCategoryForAnnualExpensesByBudgetChart = methods.watch(
    "financialCategoryIdFilterForAnnualExpensesByBudgetChart"
  );
  const watchedBankAccountIdFilter = methods.watch(
    "dashboardBankAccountSelect"
  );

  useEffect(() => {
    setFinancialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart(
      watchedFinancialCategoryForAnnualMonthlyExpensesByBudgetChart
    );
  }, [watchedFinancialCategoryForAnnualMonthlyExpensesByBudgetChart]);

  useEffect(() => {
    setFinancialCategoryIdFilterForAnnualExpensesByBudgetChart(
      watchedFinancialCategoryForAnnualExpensesByBudgetChart
    );
  }, [watchedFinancialCategoryForAnnualExpensesByBudgetChart]);

  useEffect(() => {
    setBankAccountIdFilter(
      watchedBankAccountIdFilter
    );
  }, [watchedBankAccountIdFilter]);

  return (
    <>
      <PeriodNavigator
        mode="year"
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <FormProvider {...methods}>
        <BankAccountSelect
          name="dashboardBankAccountSelect"
          label=""
          emptyLabel="Tous les comptes"
        />
      </FormProvider>
      <div className="dashboard-container">
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualMonthlyExpensesIncomeChart
              startDate={startDate}
              endDate={endDate}
              bankAccountId={
                bankAccountIdFilter
              }
            />
          </div>
        </div>
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualMonthlyBalanceChart
              startDate={startDate}
              endDate={endDate}
              bankAccountId={
                bankAccountIdFilter
              }
            />
          </div>
        </div>
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualMonthlyExpensesByBudgetChart
              startDate={startDate}
              endDate={endDate}
              financialCategoryId={
                financialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart
              }
              bankAccountId={
                bankAccountIdFilter
              }
            />
          </div>
          <div className="chart-filter">
            <FormProvider {...methods}>
              <FinancialCategorySelect
                name="financialCategoryIdFilterForAnnualMonthlyExpensesByBudgetChart"
                label=""
                emptyLabel="Toutes les catégories"
              />
            </FormProvider>
          </div>
        </div>
        <div className="chart-main-container">
          <div className="chart-container">
            <AnnualExpensesByBudgetChart
              startDate={startDate}
              endDate={endDate}
              financialCategoryId={
                financialCategoryIdFilterForAnnualExpensesByBudgetChart
              }
              bankAccountId={
                bankAccountIdFilter
              }
            />
          </div>
          <div className="chart-filter">
            <FormProvider {...methods}>
              <FinancialCategorySelect
                name="financialCategoryIdFilterForAnnualExpensesByBudgetChart"
                label=""
                emptyLabel="Toutes les catégories"
              />
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
