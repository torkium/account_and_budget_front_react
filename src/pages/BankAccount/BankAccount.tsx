import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  apiBankAccountService,
  BankAccountInterface,
} from "../../services/apiBankAccountService"
import { useAlert } from "../../context/AlertContext"
import MainLayout from "../../components/Layout/MainLayout"
import Table from "../../components/Table/Table"
import {
  apiTransactionService,
  TransactionInterface,
} from "../../services/apiTransactionService"

import Modal from "../../components/Modal/Modal"
import InputField from "../../components/Form/Fields/Input"
import FinancialCategorySelect from "../../components/Category/FinancialCategorySelect"
import { useForm, FormProvider } from "react-hook-form"
type BankAccountParams = {
  accountId?: string
};

const BankAccount = () => {
  let { accountId } = useParams<BankAccountParams>()
  const { showAlert } = useAlert()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const methods = useForm()
  const [bankAccount, setBankAccount] = useState<BankAccountInterface | null>(
    null
  )
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

  const headers = ["Date", "Label", "Amount", "Category", "Action"]

  const loadTransactions = async () => {
    if (bankAccount) {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
        .toISOString()
        .split("T")[0]
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )
        .toISOString()
        .split("T")[0]

      try {
        const fetchedTransactions = await apiTransactionService.getTransactions(
          bankAccount.id,
          startDate,
          endDate
        )
        setTransactions(fetchedTransactions);
      } catch (error) {
        showAlert("Impossible de récupérer les transactions", "error");
      }
    }
  }

  useEffect(() => {
    const idNum = accountId ? parseInt(accountId, 10) : NaN;

    if (!isNaN(idNum)) {
      const fetchBankAccounts = async () => {
        try {
          const account = await apiBankAccountService.show(idNum);
          setBankAccount(account);
        } catch (error) {
          showAlert("Impossible de récupérer les détails du compte", "error");
        }
      }

      fetchBankAccounts();
    } else {
      showAlert("ID du compte invalide", "error");
    }
  }, [accountId])

  useEffect(() => {
    loadTransactions();
  }, [bankAccount])

  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Label: transaction.label,
    Amount: transaction.amount + " €",
    Category: transaction.financialCategory?.label,
    Action: <button>modifier</button>,
  }))

  const onSubmit = async (formData: any) => {
    if (!bankAccount || !bankAccount.id) {
      showAlert("ID du compte bancaire est invalide.", "error");
      return
    }

    try {
      const newTransactionData = {
        reference: formData.reference,
        label: formData.label,
        amount: parseFloat(formData.amount),
        date: formData.date,
        financialCategory: parseInt(formData.financialCategoryId),
      }

      const createdTransaction = await apiTransactionService.createTransaction(
        bankAccount.id,
        newTransactionData
      )

      setIsModalOpen(false)
      showAlert("Transaction créée avec succès.", "success")

      loadTransactions()
      methods.reset()
      console.log(formData)
    } catch (error) {
      showAlert(
        "Erreur lors de la création de la transaction. Veuillez réessayer.",
        "error"
      )
    }
  }

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsModalOpen(true)
  }
  return (
    <MainLayout>
      {bankAccount ? (
        <>
          <div>
            <h2>Détails du compte bancaire</h2>
            <p>ID du compte : {bankAccount.id}</p>
            <p>Intitulé du compte : {bankAccount.label}</p>
          </div>

          <button onClick={openModal}>Ajouter</button>
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
        onClose={() => setIsModalOpen(false)}
        title={"Ajout d'une transaction sur le compte " + bankAccount?.label }
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
              validationRules={{ required: "Ce champ est requis" }}
            />
            <div className="buttons-container">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </MainLayout>
  )
}

export default BankAccount
