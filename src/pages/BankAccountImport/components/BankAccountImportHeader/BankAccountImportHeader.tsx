import React from "react";
import './BankAccountImportHeader.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import { useNavigate } from "react-router-dom";

interface BankAccountImportProps {
}

const BankAccountImportHeader: React.FC<BankAccountImportProps> = () => {
  const {bankAccount} = useBankAccountContext();
  const navigate = useNavigate();
  const navigateToSettings = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <div className="header-container">
        <h2>Import de transactions sur le compte {bankAccount.label}</h2>
        <button className="settings-button" onClick={() => navigateToSettings(`/bank-account/${bankAccount.id}`)} >Retour au compte</button>
      </div>
    </>
  );
};

export default BankAccountImportHeader;
