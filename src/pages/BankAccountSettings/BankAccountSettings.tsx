import { useParams } from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";

import { useBankAccount } from "../../hooks/useBankAccount";
import BankAccountSettingsHeader from "./components/BankAccountSettingsHeader/BankAccountSettingsHeader";

type BankAccountParams = {
  accountId?: string;
};

const BankAccount = () => {
  const { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);

  return (
    <MainLayout>
      {bankAccount ? (
        <>
          <BankAccountSettingsHeader bankAccount={bankAccount} />

        </>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </MainLayout>
  );
};

export default BankAccount;
