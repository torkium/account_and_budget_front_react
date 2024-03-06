import { useParams } from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";

import { useBankAccount } from "../../hooks/useBankAccount";
import BankAccountImportHeader from "./components/BankAccountImportHeader/BankAccountImportHeader";
import { BankAccountProvider } from "../../context/BankAccountContext";
import TransactionsImport from "../../components/Transactions/Import/TransactionsImport";
import { useCallback } from "react";

type BankAccountParams = {
  bankAccountId?: string;
};

const BankAccountImport = () => {
  const { bankAccountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(bankAccountId);
  const onImportPending = useCallback(() => {}, []);

  const onImportEnded = useCallback(() => {}, []);
  return (
    <>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <BankAccountImportHeader />
          <TransactionsImport
            bankAccountId={bankAccount.id}
            onImportEnded={onImportEnded}
            onImportPending={onImportPending}
          />
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </>
  );
};

export default BankAccountImport;
