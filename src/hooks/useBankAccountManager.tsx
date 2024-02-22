import { BankAccountInterface } from "../interfaces/Bank";
import { useAlert } from "../context/AlertContext";
import { apiBankAccountService } from "../services/apiBankAccountService";

interface UseBankAccountManagerProps {
  reloadBankAccounts: () => void;
}

export const useBankAccountManager = ({ reloadBankAccounts }: UseBankAccountManagerProps) => {
  const { showAlert } = useAlert();

  const createOrUpdateBankAccount = async (bankAccount: BankAccountInterface | null, formData: any) => {
    try {
      const newBankAccountData = {
        id: bankAccount?.id ?? undefined,
        ...formData,
        balance: parseFloat(formData.balance),
      };

      if (bankAccount?.id) {
        await apiBankAccountService.push(newBankAccountData);
        showAlert("Bank account updated successfully.", "success");
      } else {
        await apiBankAccountService.push(newBankAccountData);
        showAlert("Bank account created successfully.", "success");
      }
      reloadBankAccounts();
    } catch (error) {
      showAlert("An error occurred. Please try again.", "error");
    }
  };

  const deleteBankAccount = async (bankAccount: BankAccountInterface) => {
    try {
      await apiBankAccountService.remove(bankAccount);
      reloadBankAccounts();
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
