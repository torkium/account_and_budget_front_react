import React from "react";
import './BankAccountSettingsScheduledTransactionOnce.css';
import Card from "../../../../components/Card/Card";
import ScheduledTransactionsOnceList from "../../../../components/ScheduledTransactions/ScheduledTransactionsOnce/ScheduledTransactionsOnceList";

interface BankAccountSettingsScheduledTransactionOnceProps {
}

const BankAccountSettingsScheduledTransactionOnce: React.FC<BankAccountSettingsScheduledTransactionOnceProps> = () => {
  return (
    <Card>
      <h3>Paramétrage des transactions prévisionnelles</h3>
      <ScheduledTransactionsOnceList />
    </Card>
  );
};

export default BankAccountSettingsScheduledTransactionOnce;
