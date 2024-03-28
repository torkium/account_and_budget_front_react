import React from "react";
import './BankAccountSettingsScheduledTransactionCron.css';
import Card from "../../../../components/generic/Card/Card";
import ScheduledTransactionsCronList from "../../../../components/ScheduledTransactions/ScheduledTransactionsCron/ScheduledTransactionsCronList";

interface BankAccountSettingsScheduledTransactionCronProps {
}

const BankAccountSettingsScheduledTransactionCron: React.FC<BankAccountSettingsScheduledTransactionCronProps> = () => {
  return (
    <Card>
      <h3>Paramétrage des transactions prévisionnelles réccurentes</h3>
      <ScheduledTransactionsCronList />
    </Card>
  );
};

export default BankAccountSettingsScheduledTransactionCron;
