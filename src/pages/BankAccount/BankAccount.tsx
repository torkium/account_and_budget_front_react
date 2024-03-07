// external libraries
import { useParams } from "react-router-dom";

// local components

// custom hooks
import { useBankAccount } from "../../hooks/useBankAccount";
import { BankAccountProvider } from "../../context/BankAccountContext";
import { BankAccountDetailsProvider } from "../../context/BankAccountDetailsContext";
import BankAccountDetails from "./BankAccountDetails";

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
            <BankAccountDetails />
          </BankAccountDetailsProvider>
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
      </>
  );
};

export default BankAccount;
