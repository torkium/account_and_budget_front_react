import React from "react";
import './BankAccountSettingsGeneral.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import Card from "../../../../components/Card/Card";

interface BankAccountSettingsGeneralProps {
}

const BankAccountSettingsGeneral: React.FC<BankAccountSettingsGeneralProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <Card>
      <h3>Paramètres du compte</h3>
    </Card>
  );
};

export default BankAccountSettingsGeneral;
