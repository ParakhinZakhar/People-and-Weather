"use client";

import { createContext, useContext, useState } from "react";

type UIStep = "banner" | "form" | "users";

interface UIFlowContextType {
  step: UIStep;
  goToBanner: () => void;
  goToForm: () => void;
  goToUsers: () => void;
}

const UIFlowContext = createContext<UIFlowContextType | undefined>(undefined);

export const UIFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState<UIStep>("banner");

  return (
    <UIFlowContext.Provider
      value={{
        step,
        goToBanner: () => setStep("banner"),
        goToForm: () => setStep("form"),
        goToUsers: () => setStep("users"),
      }}
    >
      {children}
    </UIFlowContext.Provider>
  );
};

export const useUIFlow = () => {
  const ctx = useContext(UIFlowContext);
  if (!ctx) throw new Error("useUIFlow must be used within UIFlowProvider");
  return ctx;
};
