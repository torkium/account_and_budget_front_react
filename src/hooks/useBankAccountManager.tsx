import { BankAccountInterface } from "../interfaces/Bank";
import { useAlert } from "../context/AlertContext";
import { apiBankAccountService } from "../services/apiBankAccountService";

interface UseBankAccountManagerProps {
  reloadBankAccounts?: () => void;
}

export const useBankAccountManager = ({ reloadBankAccounts }: UseBankAccountManagerProps) => {
  const { showAlert } = useAlert();

  const createOrUpdateBankAccount = async (bankAccount: BankAccountInterface | null, formData: any) => {
    let bankAccountCreated: BankAccountInterface | null = null;
    try {
      const newBankAccountData = {
        id: bankAccount?.id ?? undefined,
        ...formData,
        balance: parseFloat(formData.balance),
        bank_id: parseInt(formData.bankId),
      };

      if (bankAccount?.id) {
        bankAccountCreated = await apiBankAccountService.push(newBankAccountData);
        showAlert("Bank account updated successfully.", "success");
      } else {
        bankAccountCreated = await apiBankAccountService.push(newBankAccountData);
        showAlert("Bank account created successfully.", "success");
      }
      reloadBankAccounts && reloadBankAccounts();
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
    return bankAccountCreated;
  };

  const deleteBankAccount = async (bankAccount: BankAccountInterface) => {
    try {
      await apiBankAccountService.remove(bankAccount);
      reloadBankAccounts && reloadBankAccounts();
      showAlert("Bank account deleted successfully.", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  return {
    createOrUpdateBankAccount,
    deleteBankAccount,
  };
};
