import React from "react";
import Table, { VerticalTable } from "../../../../components/Table/Table";
import { BankAccountOverviewInterface } from "../../../../interfaces/Bank";

interface BankAccountsTableProps {
  bankAccountOverview?: BankAccountOverviewInterface;
}

const BankAccountsOverviewTable: React.FC<BankAccountsTableProps> = ({ bankAccountOverview }) => {
  const headers = ["Solde initial", "Crédit", "Débit", "Reste", "Solde final"];
  const bankAccountData = [{
    "Solde initial": `${bankAccountOverview?.startBalance} €`,
    "Crédit": <>{bankAccountOverview?.credit} € <span className="lowLight">({bankAccountOverview?.provisionalCredit} €)</span></>,
    "Débit": <>{bankAccountOverview?.debit} € <span className="lowLight">({bankAccountOverview?.provisionalDebit} €)</span></>,
    "Reste": <>{bankAccountOverview?.summary} € <span className="lowLight">({bankAccountOverview?.provisionalSummary} €)</span></>,
    "Solde final": <>{bankAccountOverview?.endBalance} € <span className="lowLight">({bankAccountOverview?.provisionalEndBalance} €)</span></>,
  }];

  return <VerticalTable headers={headers} data={bankAccountData} />;
};

export default BankAccountsOverviewTable;
