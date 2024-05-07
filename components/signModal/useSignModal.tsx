import { useState } from 'react';

const useSignModal = (initialSignatures: any = null) => {
  const [signatures, setSignatures] = useState(initialSignatures);

  const handleSaveSignature = (signatureData: any, signatureKey: string) => {
    setSignatures((prevSignatures: any) => ({
      ...prevSignatures,
      [signatureKey]: signatureData,
    }));
  };

  return { signatures, handleSaveSignature };
};

export default useSignModal;