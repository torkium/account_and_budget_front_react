import { useParams } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Table from "../../components/Table/Table";
import { useBankAccount } from "../../hooks/useBankAccount";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionPushModal from "./Modals/TransactionPushModal";
import TransactionDeleteConfirmationModal from "./Modals/TransactionDeleteConfirmationModal";
import { useTransactionManager } from "../../hooks/useTransactionManager";

type BankAccountParams = {
  accountId?: string;
};

const BankAccount = () => {
  let { accountId } = useParams<BankAccountParams>();
  const bankAccount = useBankAccount(accountId);
  const { transactions, reloadTransactions } = useTransactions(bankAccount?.id);

  const {
    isTransactionPushModalOpen,
    isTransactionDeleteConfirmationModalOpen,
    selectedTransaction,
    openTransactionPushModal,
    closeTransactionPushModal,
    openDeleteConfirmationModal,
    closeDeleteConfirmationModal,
    submitTransaction,
    deleteTransaction,
  } = useTransactionManager({
    bankAccountId: bankAccount?.id ?? null,
    reloadTransactions,
  });

  const headers = ["Date", "Ref", "Label", "Amount", "Category", "Action"];

  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Ref: transaction.reference,
    Label: transaction.label,
    Amount: transaction.amount + " €",
    Category: transaction.financialCategory?.label,
    Action: transaction.id ? (
      <>
        <button onClick={() => openTransactionPushModal(transaction)}>modifier</button>
        <button
          className={"btn-delete"}
          onClick={() => openDeleteConfirmationModal(transaction)}
        >
          x
        </button>
      </>
    ) : (
      <>
        <button>Valider</button>
      </>
    ),
  }));

  return (
    <MainLayout>
      {bankAccount ? (
        <>
          <div>
            <h2>Détails du compte bancaire</h2>
            <p>ID du compte : {bankAccount.id}</p>
            <p>Intitulé du compte : {bankAccount.label}</p>
          </div>

          <button onClick={() => openTransactionPushModal()}>Ajouter</button>
          <Table
            headers={headers}
            data={transactionData}
            rowClassName={(rowData) =>
              !rowData["id"] ? "lowlight" : undefined
            }
          />
        </>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
      <TransactionPushModal
        isOpen={isTransactionPushModalOpen}
        onClose={closeTransactionPushModal}
        onSubmit={submitTransaction}
        transaction={selectedTransaction}
      />
      <TransactionDeleteConfirmationModal
        isOpen={isTransactionDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={deleteTransaction}
        transaction={selectedTransaction}
      />
    </MainLayout>
  );
};

export default BankAccount;
