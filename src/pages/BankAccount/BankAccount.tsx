// external libraries
import { useParams } from "react-router-dom";

// local components
import MainLayout from "../../components/Layout/MainLayout";
import PeriodNavigator from '../../components/Period/PeriodNavigator';

// custom hooks
import { useBankAccount } from "../../hooks/useBankAccount";
import TransactionsList from "../../components/Transactions/TransactionList";
import BankAccountOverview from "../../components/BankAccount/BankAccountOverview";
import { BankAccountProvider } from "../../context/BankAccountContext";

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
    <MainLayout>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <BankAccountOverview />
          <PeriodNavigator mode="month" />
          <TransactionsList />
          </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </MainLayout>
  );
};

export default BankAccount;
