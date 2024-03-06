// external libraries
import { useParams } from "react-router-dom";

// local components
import MainLayout from "../../components/Layout/MainLayout";
import PeriodNavigator from "../../components/Period/PeriodNavigator";

// custom hooks
import { useBankAccount } from "../../hooks/useBankAccount";
import TransactionsList from "../../components/Transactions/TransactionsList";
import BankAccountOverview from "./components/BankAccountOverview/BankAccountOverview";
import { BankAccountProvider } from "../../context/BankAccountContext";
import { BankAccountDetailsProvider } from "../../context/BankAccountDetailsContext";
import BankAccountOverviewHeader from "./components/BankAccountOverview/BankAccountOverviewHeader/BankAccountOverviewHeader";

// route parameters
type BankAccountParams = {
  accountId?: string;
};

// Main component
const BankAccount = () => {
  // get date hooks
  const { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);

  // Render
  return (
    <>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <BankAccountDetailsProvider>
            <BankAccountOverviewHeader />
            <PeriodNavigator mode="month" />
            <BankAccountOverview />
            <TransactionsList />
          </BankAccountDetailsProvider>
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
      </>
  );
};

export default BankAccount;
