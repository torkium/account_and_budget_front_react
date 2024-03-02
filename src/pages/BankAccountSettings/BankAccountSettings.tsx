import { useParams } from "react-router-dom";

import MainLayout from "../../components/Layout/MainLayout";

import { useBankAccount } from "../../hooks/useBankAccount";
import BankAccountSettingsHeader from "./components/BankAccountSettingsHeader/BankAccountSettingsHeader";
import { BankAccountProvider } from "../../context/BankAccountContext";
import BankAccountSettingsBudget from "./components/BankAccountSettingsBudget/BankAccountSettingsBudget";
import BankAccountSettingsGeneral from "./components/BankAccountSettingsGeneral/BankAccountSettingsGeneral";
import BankAccountSettingsScheduledTransactionCron from "./components/BankAccountSettingsScheduledTransactionCron/BankAccountSettingsScheduledTransactionCron";
import BankAccountSettingsScheduledTransactionOnce from "./components/BankAccountSettingsScheduledTransactionOnce/BankAccountSettingsScheduledTransactionOnce";

type BankAccountParams = {
  accountId?: string;
};

const BankAccountSettings = () => {
  const { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);

  return (
    <MainLayout>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <BankAccountSettingsHeader />
          <BankAccountSettingsGeneral />
          <BankAccountSettingsBudget />
          <BankAccountSettingsScheduledTransactionCron />
          <BankAccountSettingsScheduledTransactionOnce />
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </MainLayout>
  );
};

export default BankAccountSettings;
