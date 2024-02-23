import React, { createContext, useContext, ReactNode } from "react";
import { BankAccountInterface } from "../interfaces/Bank";

interface BankAccountContextType {
  bankAccount: BankAccountInterface;
}

const BankAccountContext = createContext<BankAccountContextType | undefined>(
  undefined
);

interface BankAccountProviderProps {
  children: ReactNode;
  bankAccount: BankAccountInterface;
}

export const BankAccountProvider: React.FC<BankAccountProviderProps> = ({
  children,
  bankAccount,
}) => {
  return (
    <BankAccountContext.Provider
      value={{
        bankAccount,
      }}
    >
      {children}
    </BankAccountContext.Provider>
  );
};

export const useBankAccountContext = () => {
  const context = useContext(BankAccountContext);
  if (!context) {
    throw new Error(
      "useBankAccountContext must be used within a BankAccountProvider"
    );
  }
  return context;
};
