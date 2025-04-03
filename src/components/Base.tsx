import { ReactNode } from 'react';
import { PAGE_TYPE_ENUM } from '../enums/page-type-enum.ts';
import TopBar from './TopBar.tsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Base(props: IProps) {
  function checkComponent() {
    switch (props.type) {
      case PAGE_TYPE_ENUM.PRIMARY:
        return (
          <div>
            <TopBar />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                {props.children}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      case PAGE_TYPE_ENUM.DASHBOARD:
        return (
          <div>
            <h1>DASHBOARD</h1>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                {props.children}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      default:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {props.children}
            </motion.div>
          </AnimatePresence>
        );
    }
  }

  return <>{checkComponent()}</>;
}

interface IProps {
  children: ReactNode;
  type: PAGE_TYPE_ENUM;
}
