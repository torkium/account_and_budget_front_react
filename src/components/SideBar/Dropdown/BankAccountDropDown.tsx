import React, { MouseEventHandler, useCallback, useState } from "react";
import BankAccountPushModal from "./Modals/BankAccountPushModal";
import Dropdown, { DropdownItemsProps } from "./Dropdown";
import { useBankAccounts } from "../../../hooks/useBankAccounts";
import { useBankAccountManager } from "../../../hooks/useBankAccountManager";

const BankAccountDropDown: React.FC = () => {
  const [isBankAccountPushModalOpen, setIsBankAccountPushModalOpen] = useState(false);
  const { bankAccounts, reloadBankAccounts } = useBankAccounts();
  const { createOrUpdateBankAccount } = useBankAccountManager({ reloadBankAccounts });

  const openModal: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    setIsBankAccountPushModalOpen(true);
  };

  const closeBankAccountPushModal = useCallback(() => {
    setIsBankAccountPushModalOpen(false);
  }, []);

  const accountItems: DropdownItemsProps[] = bankAccounts.map(account => ({
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
    await createOrUpdateBankAccount(null, formData);
    closeBankAccountPushModal();
  };

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
