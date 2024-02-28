import { useState, useEffect } from "react";
import { BankAccountInterface } from "../interfaces/Bank";
import { ApiBankAccountService } from "../services/apiBankAccountService";
import { useAlert } from "../context/AlertContext";

export const useBankAccount = (accountId: string | undefined) => {
  const [bankAccount, setBankAccount] = useState<BankAccountInterface | null>(null);
  const { showAlert } = useAlert();
  const apiBankAccountService = new ApiBankAccountService();

  useEffect(() => {
    const fetchBankAccount = async () => {
      if (!accountId) return;
      const idNum = parseInt(accountId, 10);
      if (isNaN(idNum)) {
        showAlert("Bank account ID is invalid", "error");
        return;
      }
      try {
        const account = await apiBankAccountService.show(idNum);
        setBankAccount(account);
      } catch (error) {
        showAlert("Fetching bank account failed", "error");
      }
    };

    fetchBankAccount();
  }, [accountId]);

  return bankAccount;
};
