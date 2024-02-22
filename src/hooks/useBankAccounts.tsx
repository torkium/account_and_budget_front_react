import { useState, useEffect } from "react";
import { BankAccountInterface } from "../interfaces/Bank";
import { apiBankAccountService } from "../services/apiBankAccountService";
import { useAlert } from "../context/AlertContext";

export const useBankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccountInterface[]>([]);
  const [reloadFlag, setReloadFlag] = useState(false);
  const { showAlert } = useAlert();

  const reloadBankAccounts = () => {
    setReloadFlag(prevFlag => !prevFlag);
  };

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const accounts = await apiBankAccountService.get();
        setBankAccounts(accounts);
      } catch (error) {
        showAlert("Fetching bank accounts failed", "error");
      }
    };

    fetchBankAccounts();
  }, [reloadFlag]);

  return { bankAccounts, reloadBankAccounts };
};
