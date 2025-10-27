"use client";

import { useUIFlow } from "@/providers/UIFlowProvider";
import HomeBanner from "@/components/HomeBanner";
import UserInputForm from "@/components/UserInputForm";
import UserCardsList from "@/components/UserCardsList";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { step } = useUIFlow();

  return (
    <AnimatePresence mode="wait">
        {step === "banner" && (
          <motion.div
            key="banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <HomeBanner />
          </motion.div>
        )}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UserInputForm />
          </motion.div>
        )}
        {step === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UserCardsList />
          </motion.div>
        )}
      </AnimatePresence>
  );
}
