import { useParams } from "react-router-dom";
import "./BankAccountSettings.css";
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
    <>
      {bankAccount ? (
        <BankAccountProvider bankAccount={bankAccount}>
          <div className="bank-account-settings-container">
            <BankAccountSettingsHeader />
            <div className="bank-account-settings-item">
              <BankAccountSettingsGeneral />
            </div>
            <div className="bank-account-settings-item">
              <BankAccountSettingsBudget />
            </div>
            <div className="bank-account-settings-item">
              <BankAccountSettingsScheduledTransactionCron />
            </div>
            <div className="bank-account-settings-item">
              <BankAccountSettingsScheduledTransactionOnce />
            </div>
          </div>
        </BankAccountProvider>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </>
  );
};

export default BankAccountSettings;
