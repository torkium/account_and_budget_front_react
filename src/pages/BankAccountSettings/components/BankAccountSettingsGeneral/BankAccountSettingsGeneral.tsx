import React, { useState } from "react";
import './BankAccountSettingsGeneral.css';
import Card from "../../../../components/generic/Card/Card";
import BankAccountFormEdit from "../../../../components/BankAccount/Forms/BankAccountFormEdit";
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import { useBankAccountManager } from "../../../../hooks/useBankAccountManager";
import { useBankAccounts } from "../../../../hooks/useBankAccounts";
import { BankAccountInterface } from "../../../../interfaces/Bank";

interface BankAccountSettingsGeneralProps {
}

const BankAccountSettingsGeneral: React.FC<BankAccountSettingsGeneralProps> = () => {
  const {bankAccount} = useBankAccountContext();
  const [bankAccountToEdit, setBankAccountToEdit] = useState<BankAccountInterface>(bankAccount);
  const { reloadBankAccounts } = useBankAccounts();
  const { createOrUpdateBankAccount } = useBankAccountManager({ reloadBankAccounts });

  const handleSubmit = async (formData: any) => {
    let bankAccountEdited = await createOrUpdateBankAccount(bankAccount, formData);
    if(bankAccountEdited){
      setBankAccountToEdit(bankAccountEdited);
    }
  };

  return (
    <Card>
      <h3>Paramètres du compte</h3>
      <BankAccountFormEdit bankAccount={bankAccountToEdit} onSubmit={handleSubmit} allowSetInitialFromActualBalance={true} />
    </Card>
  );
};

export default BankAccountSettingsGeneral;
