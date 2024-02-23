import React from "react";
import './BankAccountOverviewHeader.css';
import { BankAccountInterface } from "../../../../../interfaces/Bank";
import { Link, useNavigate } from "react-router-dom";

interface BankAccountOverviewProps {
    bankAccount: BankAccountInterface
}

const BankAccountOverviewHeader: React.FC<BankAccountOverviewProps> = ({bankAccount}) => {
  const navigate = useNavigate();
  const navigateToSettings = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <div className="header-container">
        <h2>Détails du compte bancaire {bankAccount.label}</h2>
        <button className="settings-button" onClick={() => navigateToSettings(`/bank-account/${bankAccount.id}/settings`)} >Paramétrer mon compte</button>
      </div>
    </>
  );
};

export default BankAccountOverviewHeader;
