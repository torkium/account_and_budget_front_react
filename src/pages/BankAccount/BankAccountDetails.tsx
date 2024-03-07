// external libraries

// local components
import PeriodNavigator from "../../components/Period/PeriodNavigator";

// custom hooks
import TransactionsList from "../../components/Transactions/TransactionsList";
import BankAccountOverview from "./components/BankAccountOverview/BankAccountOverview";
import {
  useBankAccountDetailsContext,
} from "../../context/BankAccountDetailsContext";
import BankAccountOverviewHeader from "./components/BankAccountOverview/BankAccountOverviewHeader/BankAccountOverviewHeader";

// Main component
const BankAccountDetails = () => {
  // get date hooks
  const { startDate, setStartDate, setEndDate } =
    useBankAccountDetailsContext();

  // Render
  return (
    <>
      <BankAccountOverviewHeader />
      <PeriodNavigator
        mode="month"
        startDate={startDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <BankAccountOverview />
      <TransactionsList />
    </>
  );
};

export default BankAccountDetails;
