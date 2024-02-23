import React from "react";
import './BankAccountSettingsScheduledTransaction.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";

interface BankAccountSettingsScheduledTransactionProps {
}

const BankAccountSettingsScheduledTransaction: React.FC<BankAccountSettingsScheduledTransactionProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <>
      scheduled transactions settings
    </>
  );
};

export default BankAccountSettingsScheduledTransaction;
