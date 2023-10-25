"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const StoreModalContext = createContext({
  isOpen: false,
  openModal: (s: boolean) => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <StoreModalContext.Provider value={{ isOpen, openModal: setIsOpen }}>
      <StoreModal />
      {children}
    </StoreModalContext.Provider>
  );
};
