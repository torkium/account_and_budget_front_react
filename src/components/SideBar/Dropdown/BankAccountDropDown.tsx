import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import BankAccountPushModal from "./Modals/BankAccountPushModal";
import Dropdown, { DropdownItemsProps } from "./Dropdown";
import { useBankAccounts } from "../../../hooks/useBankAccounts";
import { useBankAccountManager } from "../../../hooks/useBankAccountManager";
import { useNavigate } from "react-router-dom";

const BankAccountDropDown: React.FC = () => {
  const { bankAccounts, reloadBankAccounts, isBankAccountsLoaded } = useBankAccounts();
  const [isBankAccountPushModalOpen, setIsBankAccountPushModalOpen] =
    useState(false);
  const { createOrUpdateBankAccount } = useBankAccountManager({
    reloadBankAccounts,
  });
  const navigate = useNavigate();

  const openModal: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setIsBankAccountPushModalOpen(true);
  };

  const closeBankAccountPushModal = useCallback(() => {
    setIsBankAccountPushModalOpen(false);
  }, []);

  const accountItems: DropdownItemsProps[] = bankAccounts.map((account) => ({
    id: account.id,
    label: account.label,
    href: `/bank-account/${account.id}`,
    onClick: undefined,
  }));

  accountItems.push({
    id: 0,
    label: "+",
    href: ``,
    onClick: openModal,
  });

  const handleSubmit = async (formData: any) => {
    let bankAccount = await createOrUpdateBankAccount(null, formData);
    closeBankAccountPushModal();
    if (bankAccount) {
      navigate(`/bank-account/${bankAccount.id}`);
    }
    reloadBankAccounts();
  };

  useEffect(() => {
    if(isBankAccountsLoaded && bankAccounts.length === 0){
      setIsBankAccountPushModalOpen(true);
    }
  }, [isBankAccountsLoaded, bankAccounts])
  return (
    <>
      <Dropdown label="Mes comptes" items={accountItems} />
      <BankAccountPushModal
        isOpen={isBankAccountPushModalOpen}
        onClose={closeBankAccountPushModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BankAccountDropDown;
