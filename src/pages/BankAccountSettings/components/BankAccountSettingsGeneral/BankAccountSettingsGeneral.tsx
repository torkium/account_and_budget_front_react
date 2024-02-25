import React from "react";
import './BankAccountSettingsGeneral.css';
import Card from "../../../../components/Card/Card";
import BankAccountFormEdit from "../../../../components/BankAccount/Forms/BankAccountFormEdit";

interface BankAccountSettingsGeneralProps {
}

const BankAccountSettingsGeneral: React.FC<BankAccountSettingsGeneralProps> = () => {
  return (
    <Card>
      <h3>Paramètres du compte</h3>
      <BankAccountFormEdit />
    </Card>
  );
};

export default BankAccountSettingsGeneral;
