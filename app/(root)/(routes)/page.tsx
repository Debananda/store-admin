"use client";

import { useContext, useEffect } from "react";

import { StoreModalContext } from "@/providers/modal-provider";

const SetupPage = () => {
  const { isOpen, openModal } = useContext(StoreModalContext);

  useEffect(() => {
    if (!isOpen) {
      openModal(true);
    }
  }, [isOpen, openModal]);

  return null;
};

export default SetupPage;
