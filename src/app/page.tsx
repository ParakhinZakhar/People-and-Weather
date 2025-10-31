"use client";

import { useUIFlow } from '@/providers/UIFlowProvider'
import HomeBanner from '@/components/HomeBanner'
import NewUsers from '@/components/NewUsers'
import SavedUsers from '@/components/SavedUsers'
import { motion, AnimatePresence } from 'framer-motion'

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
            <NewUsers />
          </motion.div>
        )}
        {step === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SavedUsers />
          </motion.div>
        )}
      </AnimatePresence>
  );
}