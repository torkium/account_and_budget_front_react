import React from "react";
import './BankAccountSettingsGeneral.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";

interface BankAccountSettingsGeneralProps {
}

const BankAccountSettingsGeneral: React.FC<BankAccountSettingsGeneralProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <>
      General settings
    </>
  );
};

export default BankAccountSettingsGeneral;
