import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TransactionInterface } from "../../interfaces/Transaction";
import { useAlert } from "../../context/AlertContext";
import MainLayout from "../../components/Layout/MainLayout";
import Table from "../../components/Table/Table";
import { apiTransactionService } from "../../services/apiTransactionService";

import Modal from "../../components/Modal/Modal";
import InputField from "../../components/Form/Fields/Input";
import FinancialCategorySelect from "../../components/Category/FinancialCategorySelect";
import { useForm, FormProvider } from "react-hook-form";
import { useBankAccount } from "../../hooks/useBankAccount";
import { useTransactions } from "../../hooks/useTransactions";
type BankAccountParams = {
  accountId?: string;
};

const BankAccount = () => {
  let { accountId } = useParams<BankAccountParams>();
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionInterface | null>(null);

  const methods = useForm();
  const bankAccount = useBankAccount(accountId);
  const { transactions, reloadTransactions } = useTransactions(bankAccount?.id);

  const headers = ["Date", "Ref", "Label", "Amount", "Category", "Action"];

  useEffect(() => {
    if (isModalOpen && selectedTransaction) {
      resetForm()
    }
  }, [isModalOpen, selectedTransaction, methods]);

  const onSubmit = async (formData: any) => {
    if (!bankAccount || !bankAccount.id) {
      showAlert("ID du compte bancaire est invalide.", "error");
      return;
    }

    try {
      const newTransactionData = {
        id: selectedTransaction?.id ?? undefined,
        reference: formData.reference,
        label: formData.label,
        amount: parseFloat(formData.amount),
        date: formData.date,
        financialCategory: parseInt(formData.financialCategoryId),
      };

      const createdTransaction = await apiTransactionService.pushTransaction(
        bankAccount.id,
        newTransactionData
      );
      reloadTransactions();
      setIsModalOpen(false);
      showAlert(
        "Transaction " +
          (selectedTransaction?.id ? "modifiée" : "créée") +
          " avec succès.",
        "success"
      );

      resetForm();
    } catch (error) {
      showAlert(
        "Erreur lors de la création de la transaction. Veuillez réessayer.",
        "error"
      );
    }
  };

  const onDelete = async () => {
    if (!selectedTransaction) {
      showAlert("Aucune transaction sélectionnée.", "error");
      return;
    }
    if (!bankAccount || !bankAccount.id) {
      showAlert("ID du compte bancaire est invalide.", "error");
      return;
    }
    try {
      await apiTransactionService.deleteTransaction(
        bankAccount.id,
        selectedTransaction
      );

      reloadTransactions();
      setIsDeleteConfirmationModalOpen(false);
      showAlert("Transaction supprimée avec succès.", "success");

      resetForm();
    } catch (error) {
      showAlert(
        "Erreur lors de la suppression de la transaction. Veuillez réessayer.",
        "error"
      );
    }
  };

  const openAddModal = (transaction?: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsModalOpen(true);
  };
  const openUpdateModal = (transaction?: TransactionInterface) => {
    setSelectedTransaction(transaction || null);
    setIsModalOpen(true);
  };
  const resetForm = (erase: boolean = false) => {
    methods.reset({
      reference: erase || !selectedTransaction ? "" : selectedTransaction.reference,
      label: erase || !selectedTransaction ? "" : selectedTransaction.label,
      amount: erase || !selectedTransaction ? "" : selectedTransaction.amount,
      date: erase || !selectedTransaction ? "" : selectedTransaction.date.split("T")[0],
      financialCategoryId: erase || !selectedTransaction ? "" : selectedTransaction.financialCategory?.id,
    });
  };
  const closeUpdateModal = () => {
    setIsModalOpen(false);
    if (selectedTransaction) {
      setSelectedTransaction(null)
      resetForm(true);
    }
  };

  const openDeleteConfirmationModal = (transaction: TransactionInterface) => {
    setSelectedTransaction(transaction);
    setIsDeleteConfirmationModalOpen(true);
  };

  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Ref: transaction.reference,
    Label: transaction.label,
    Amount: transaction.amount + " €",
    Category: transaction.financialCategory?.label,
    Action: transaction.id ? (
      <>
        <button onClick={() => openUpdateModal(transaction)}>modifier</button>
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

          <button onClick={() => openAddModal()}>Ajouter</button>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => closeUpdateModal()}
        title={"Ajout d'une transaction sur le compte " + bankAccount?.label}
        size="large"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              name="reference"
              label="reference"
              type="text"
              validationRules={{ required: "Ce champ est requis" }}
            />
            <InputField
              name="label"
              label="label"
              type="text"
              validationRules={{ required: "Ce champ est requis" }}
            />
            <InputField
              name="amount"
              label="amount"
              type="number"
              validationRules={{
                required: "Ce champ est requis",
              }}
            />
            <InputField
              name="date"
              label="date"
              type="date"
              validationRules={{ required: "Ce champ est requis" }}
            />
            <FinancialCategorySelect
              name="financialCategoryId"
              label="Catégorie Financière"
              defaultValue={selectedTransaction?.financialCategory?.id.toString()}
              validationRules={{ required: "Ce champ est requis" }}
            />
            <div className="buttons-container">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </FormProvider>
      </Modal>
      <Modal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        title={"Confirmez vous cette action ?" + bankAccount?.label}
        size="large"
      >
        <div>
          Confirmez-vous la suppression de la transaction{" "}
          {selectedTransaction?.label} d'un montant de{" "}
          {selectedTransaction?.amount} € ?
          <div className="buttons-container">
            <button className={"btn-delete"} onClick={() => onDelete()}>
              Confirmer
            </button>
            <button onClick={() => setIsDeleteConfirmationModalOpen(false)}>
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default BankAccount;
