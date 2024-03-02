import React from "react";
import "./BankAccountOverviewHeader.css";
import { useNavigate } from "react-router-dom";
import { useBankAccountContext } from "../../../../../context/BankAccountContext";

interface BankAccountOverviewProps {}

const BankAccountOverviewHeader: React.FC<BankAccountOverviewProps> = () => {
  const { bankAccount } = useBankAccountContext();
  const navigate = useNavigate();
  const navigateToSettings = (url: string) => {
    navigate(url);
  };
  return (
    <>
      <div className="header-container">
        <h2>Détails du compte bancaire {bankAccount.label}</h2>
        <div>
          <button
            className="settings-button"
            onClick={() =>
              navigateToSettings(`/bank-account/${bankAccount.id}/settings`)
            }
          >
            Paramétrer mon compte
          </button>
          <br />
          <button
            className="settings-button"
            onClick={() =>
              navigateToSettings(`/bank-account/${bankAccount.id}/import`)
            }
          >
            Importer des transactions
          </button>
        </div>
      </div>
    </>
  );
};

export default BankAccountOverviewHeader;
