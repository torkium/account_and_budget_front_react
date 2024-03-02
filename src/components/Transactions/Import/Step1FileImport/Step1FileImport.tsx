import React from "react";

interface Step1FileImportProps {
  onFileImported: (file: File) => void;
  bankAccountId: number;
}

const Step1FileImport: React.FC<Step1FileImportProps> = ({
  onFileImported,
  bankAccountId,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log(`Fichier importé pour le compte bancaire ID: ${bankAccountId}`);
    onFileImported(file);
  };

  return (
    <>
      <button type="button" onClick={handleButtonClick}>
        Importer Transactions
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default Step1FileImport;
