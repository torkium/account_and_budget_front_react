import React, { useState } from 'react';
import Step1FileImport from './Step1FileImport/Step1FileImport';
import Step2HeadersMapping from './Step2HeadersMapping/Step2HeadersMapping';
import Step3TransactionsEdit from './Step3TransactionsEdit/Step3TransactionsEdit';
import { useBankAccountContext } from '../../../context/BankAccountContext';
import { ApiTransactionService, HeadersMappingRequestInterface } from '../../../services/apiTransactionService';
import { Option } from "../../generic/Form/Fields/Select";
import { TransactionInterface } from '../../../interfaces/Transaction';
import { useNavigate } from 'react-router-dom';

interface TransactionsImportProps {
  onImportPending: () => void;
  onImportEnded: () => void;
  bankAccountId: number;
}


const TransactionsImport: React.FC<TransactionsImportProps> = ({ onImportPending, onImportEnded, bankAccountId }) => {
  const [step, setStep] = useState<number>(1);
  const [headersOptions, setHeadersOptions] = useState<Option[]>([]);
  const [transactionsToFill, setTransactionsToFill] = useState<TransactionInterface[]>([]);
  const [fileToImport, setFileToImport] = useState<File>();

  const { bankAccount } = useBankAccountContext();
  const apiTransactionService = new ApiTransactionService(bankAccount.id);
  const navigate = useNavigate();

  const handleFileImported = async (file: File) => {
    setFileToImport(file);
    onImportPending();
    const importResult = await apiTransactionService.importRequestHeaders(bankAccountId, file);
    const options = importResult.map(header => ({ value: header, label: header }));
    setHeadersOptions(options);
    setStep(2);
  };

  const handleHeadersSelected = async (headersMapping: HeadersMappingRequestInterface) => {
    if(!fileToImport){
      setStep(1);
      return ;
    }
    setTransactionsToFill(await apiTransactionService.importRequestTransactions(bankAccountId, fileToImport, headersMapping));
    setStep(3);
  };

  const handleEditComplete = async (transactions: TransactionInterface[]) => {
    await apiTransactionService.import(bankAccountId, transactions);
    onImportEnded();
    navigate(`/bank-account/${bankAccountId}`);
  };

  return (
    <div>
      {step === 1 && <Step1FileImport onFileImported={handleFileImported} bankAccountId={bankAccountId} />}
      {step === 2 && fileToImport && <Step2HeadersMapping onSubmit={handleHeadersSelected} headersOptions={headersOptions} fileToImport={fileToImport} />}
      {step === 3 && fileToImport && <Step3TransactionsEdit onEditComplete={handleEditComplete} bankAccountId={bankAccountId} transactionsToFill={transactionsToFill} />}
    </div>
  );
};

export default TransactionsImport;
