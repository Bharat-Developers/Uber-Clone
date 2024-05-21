'use client';

import React, { FC, ReactNode } from 'react'
import { motion } from "framer-motion";

interface MyProps {
  children?: ReactNode;
}

const PageWrapper: FC<MyProps> = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default PageWrapper;