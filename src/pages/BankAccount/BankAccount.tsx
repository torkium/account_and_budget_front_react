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

type BankAccountParams = {
  accountId?: string
}

const BankAccount = () => {
  let { accountId } = useParams<BankAccountParams>()
  const { showAlert } = useAlert()

  const [bankAccount, setBankAccount] = useState<BankAccountInterface | null>(
    null
  )
  const [transactions, setTransactions] = useState<TransactionInterface[]>([])

  const headers = ["Date", "Label", "Amount", "Category", "Action"]

  useEffect(() => {
    const idNum = accountId ? parseInt(accountId, 10) : NaN

    if (!isNaN(idNum)) {
      const fetchBankAccounts = async () => {
        try {
          const account = await apiBankAccountService.show(idNum)
          setBankAccount(account)
        } catch (error) {
          showAlert("Impossible de récupérer les détails du compte", "error");
        }
      }

      fetchBankAccounts()
    } else {
      showAlert("ID du compte invalide", "error")
    }
  }, [accountId])

  useEffect(() => {
    if (bankAccount) {
      const currentDate = new Date();
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
        .toISOString()
        .split("T")[0];

      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )
        .toISOString()
        .split("T")[0];

      apiTransactionService
        .getTransactions(bankAccount.id, startDate, endDate)
        .then(setTransactions)
        .catch((error) =>
          showAlert("Impossible de récupérer les transactions", "error")
        )
    }
  }, [bankAccount])
  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Label: transaction.label,
    Amount: transaction.amount + " €",
    Category: transaction.financialCategory.label,
    Action: <button>modifier</button>
  }))

  return (
    <MainLayout>
      {bankAccount ? (
        <>
          <div>
            <h2>Détails du compte bancaire</h2>
            <p>ID du compte : {bankAccount.id}</p>
            <p>Intitulé du compte : {bankAccount.label}</p>
          </div>
          <Table headers={headers} data={transactionData} rowClassName={(rowData) => !rowData["id"] ? 'lowlight' : undefined} />
        </>
      ) : (
        <div>Chargement des détails du compte...</div>
      )}
    </MainLayout>
  )
}

export default BankAccount
