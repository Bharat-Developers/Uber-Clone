'use client';

import React, { FC, ReactNode } from 'react'
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { useInView } from 'framer-motion';

interface MyProps {
  children?: ReactNode;
}

const PageWrapper: FC<MyProps> = (props: { children: any; }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
        >
          {props.children}
        </motion.div>
      </AnimatePresence >
    </>
  )
}

export default PageWrapper;