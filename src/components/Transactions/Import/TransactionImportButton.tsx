import React, { useRef, useCallback } from "react";

interface TransactionImportButtonProps {
  onFileImported: (bankAccountId: number, file: File) => Promise<void>;
  bankAccountId: number;
}

const TransactionImportButton: React.FC<TransactionImportButtonProps> = ({ onFileImported, bankAccountId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    await onFileImported(bankAccountId, file);
  }, [onFileImported, bankAccountId]);

  return (
    <>
      <button onClick={handleImportClick}>Importer</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default TransactionImportButton;
