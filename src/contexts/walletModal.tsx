import React, { FC, useContext, useState } from 'react';

interface WalletModal {
  visible: boolean;
  setVisible: (state: boolean) => void;
}

export const WalletModalContext = React.createContext<WalletModal>({
  visible: false,
  setVisible: () => {},
});

export const WalletModalProvider: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
    </WalletModalContext.Provider>
  );
};

export const useWalletModal = (): WalletModal => {
  const { setVisible, visible } = useContext(WalletModalContext);

  return { setVisible, visible };
};
