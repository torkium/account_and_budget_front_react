import React from "react";
import './BankAccountSettingsScheduledTransaction.css';
import Card from "../../../../components/Card/Card";
import ScheduledTransactionsList from "../../../../components/ScheduledTransactions/ScheduledTransactionsList";

interface BankAccountSettingsScheduledTransactionProps {
}

const BankAccountSettingsScheduledTransaction: React.FC<BankAccountSettingsScheduledTransactionProps> = () => {
  return (
    <Card>
      <h3>Paramétrage des transactions prévisionnelles</h3>
      <ScheduledTransactionsList />
    </Card>
  );
};

export default BankAccountSettingsScheduledTransaction;
