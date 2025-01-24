import { createContext, useContext, useState } from 'react';

interface DisableContextValue {
  isDisabled: boolean;
  setIsDisabled: (value: boolean) => void;
}

const DisableContext = createContext<DisableContextValue | undefined>(undefined);

export const DisableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <DisableContext.Provider value={{ isDisabled, setIsDisabled }}>
      {children}
    </DisableContext.Provider>
  );
};

export const useDisable = (): DisableContextValue => {
  const context = useContext(DisableContext);
  if (!context) {
    throw new Error('useDisable must be used within a DisableProvider');
  }
  return context;
};