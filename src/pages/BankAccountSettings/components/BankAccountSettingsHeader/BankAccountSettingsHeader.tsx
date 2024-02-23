import React from "react";
import './BankAccountSettingsHeader.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import { useNavigate } from "react-router-dom";

interface BankAccountSettingsProps {
}

const BankAccountSettingsHeader: React.FC<BankAccountSettingsProps> = () => {
  const {bankAccount} = useBankAccountContext();
  const navigate = useNavigate();
  const navigateToSettings = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <div className="header-container">
        <h2>Paramétrage du compte bancaire {bankAccount.label}</h2>
        <button className="settings-button" onClick={() => navigateToSettings(`/bank-account/${bankAccount.id}`)} >Retour au compte</button>
      </div>
    </>
  );
};

export default BankAccountSettingsHeader;
