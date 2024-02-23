import { useParams } from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";

import { useBankAccount } from "../../hooks/useBankAccount";
import BankAccountSettingsHeader from "./components/BankAccountSettingsHeader/BankAccountSettingsHeader";
import { BankAccountProvider } from "../../context/BankAccountContext";
import BankAccountSettingsBudget from "./components/BankAccountSettingsBudget/BankAccountSettingsBudget";
import BankAccountSettingsScheduledTransaction from "./components/BankAccountSettingsScheduledTransaction/BankAccountSettingsScheduledTransaction";
import BankAccountSettingsGeneral from "./components/BankAccountSettingsGeneral/BankAccountSettingsGeneral";

type BankAccountParams = {
  accountId?: string;
};

const BankAccount = () => {
  const { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);

  return (
    <MainLayout>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <BankAccountSettingsHeader />
          <BankAccountSettingsGeneral />
          <BankAccountSettingsBudget />
          <BankAccountSettingsScheduledTransaction />
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </MainLayout>
  );
};

export default BankAccount;
