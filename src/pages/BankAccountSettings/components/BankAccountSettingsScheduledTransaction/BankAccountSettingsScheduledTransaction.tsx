import React from "react";
import './BankAccountSettingsScheduledTransaction.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import Card from "../../../../components/Card/Card";

interface BankAccountSettingsScheduledTransactionProps {
}

const BankAccountSettingsScheduledTransaction: React.FC<BankAccountSettingsScheduledTransactionProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <Card>
      <h3>Paramétrage des transactions prévisionnelles</h3>
    </Card>
  );
};

export default BankAccountSettingsScheduledTransaction;
