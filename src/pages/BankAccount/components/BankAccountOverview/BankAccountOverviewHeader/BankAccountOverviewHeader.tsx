import "./BankAccountOverviewHeader.css";
import { useNavigate } from "react-router-dom";
import { useBankAccountContext } from "../../../../../context/BankAccountContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faFileImport } from "@fortawesome/free-solid-svg-icons";

const BankAccountOverviewHeader = () => {
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
            <FontAwesomeIcon icon={faCog} />
          </button>
          <button
            className="settings-button"
            onClick={() =>
              navigateToSettings(`/bank-account/${bankAccount.id}/import`)
            }
          >
            <FontAwesomeIcon icon={faFileImport} />
          </button>
        </div>
      </div>
    </>
  );
};

export default BankAccountOverviewHeader;
