import React from "react";
import './BankAccountSettingsGeneral.css';
import Card from "../../../../components/Card/Card";
import BankAccountFormEdit from "../../../../components/BankAccount/Forms/BankAccountFormEdit";
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import { useBankAccountManager } from "../../../../hooks/useBankAccountManager";
import { useBankAccounts } from "../../../../hooks/useBankAccounts";

interface BankAccountSettingsGeneralProps {
}

const BankAccountSettingsGeneral: React.FC<BankAccountSettingsGeneralProps> = () => {
  const {bankAccount} = useBankAccountContext();
  const { reloadBankAccounts } = useBankAccounts();
  const { createOrUpdateBankAccount } = useBankAccountManager({ reloadBankAccounts });

  const handleSubmit = async (formData: any) => {
    await createOrUpdateBankAccount(bankAccount, formData);
  };

  return (
    <Card>
      <h3>Paramètres du compte</h3>
      <BankAccountFormEdit bankAccount={bankAccount} onSubmit={handleSubmit} />
    </Card>
  );
};

export default BankAccountSettingsGeneral;
