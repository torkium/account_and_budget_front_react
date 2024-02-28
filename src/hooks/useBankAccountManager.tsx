import { BankAccountInterface } from "../interfaces/Bank";
import { useAlert } from "../context/AlertContext";
import { ApiBankAccountService } from "../services/apiBankAccountService";

interface UseBankAccountManagerProps {
  reloadBankAccounts?: () => void;
}

export const useBankAccountManager = ({ reloadBankAccounts }: UseBankAccountManagerProps) => {
  const { showAlert } = useAlert();
  const apiBankAccountService = new ApiBankAccountService();

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
        bankAccountCreated = await apiBankAccountService.push(newBankAccountData, bankAccount.id);
        showAlert("Mise à jour enregistrée.", "success");
      } else {
        bankAccountCreated = await apiBankAccountService.push(newBankAccountData);
        showAlert("Compte en banque créé.", "success");
      }
      reloadBankAccounts && reloadBankAccounts();
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
    return bankAccountCreated;
  };

  const deleteBankAccount = async (bankAccount: BankAccountInterface) => {
    try {
      await apiBankAccountService.remove(bankAccount.id);
      reloadBankAccounts && reloadBankAccounts();
      showAlert("Suppression confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  return {
    createOrUpdateBankAccount,
    deleteBankAccount,
  };
};
