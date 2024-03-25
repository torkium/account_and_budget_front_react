import React from "react";
import Table, { VerticalTable } from "../../../../components/Table/Table";
import { BankAccountOverviewInterface } from "../../../../interfaces/Bank";

interface BankAccountsTableProps {
  bankAccountOverview?: BankAccountOverviewInterface;
}

const BankAccountsOverviewTable: React.FC<BankAccountsTableProps> = ({ bankAccountOverview }) => {
  const headers = ["Solde initial", "Crédit", "Débit", "Dépenses réelles", "Reste", "Solde final"];
  const bankAccountData = [{
    "Solde initial": <>{bankAccountOverview?.startBalance} € {bankAccountOverview?.provisionalStartBalance !== bankAccountOverview?.startBalance && <span className="lowLight">({bankAccountOverview?.provisionalStartBalance} €)</span>}</>,
    "Crédit": <>{bankAccountOverview?.credit} € {bankAccountOverview?.provisionalCredit !== bankAccountOverview?.credit && <span className="lowLight">({bankAccountOverview?.provisionalCredit} €)</span>}</>,
    "Débit": <>{bankAccountOverview?.debit} €  {bankAccountOverview?.provisionalDebit !== bankAccountOverview?.debit && <span className="lowLight">({bankAccountOverview?.provisionalDebit} €)</span>}</>,
    "Dépenses réelles": <>{bankAccountOverview?.realExpenses} €</>,
    "Reste": <>{bankAccountOverview?.summary} €  {bankAccountOverview?.provisionalSummary !== bankAccountOverview?.summary && <span className="lowLight">({bankAccountOverview?.provisionalSummary} €)</span>}</>,
    "Solde final": <>{bankAccountOverview?.endBalance} €  {bankAccountOverview?.provisionalEndBalance !== bankAccountOverview?.endBalance && <span className="lowLight">({bankAccountOverview?.provisionalEndBalance} €)</span>}</>,
  }];

  return <VerticalTable headers={headers} data={bankAccountData} />;
};

export default BankAccountsOverviewTable;
