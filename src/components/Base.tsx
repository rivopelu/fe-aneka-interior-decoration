import { ReactNode } from 'react';
import { PAGE_TYPE_ENUM } from '../enums/page-type-enum.ts';
import TopBar from './TopBar.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar.tsx';
import { TopBarDashboard } from './TopBarDashboard.tsx';
import { MdWhatsapp } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Base(props: IProps) {
  function checkComponent() {
    switch (props.type) {
      case PAGE_TYPE_ENUM.PRIMARY:
        return (
          <div className={'mb-10'}>
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
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <TopBarDashboard />
              <div className={'h-4'}></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  className="flex-1 pb-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {props.children}
                </motion.div>
              </AnimatePresence>
            </div>
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

  function waButton() {
    return (
      <Link
        target={'_blank'}
        to={'https://wa.me/6285174408171'}
        className={'fixed bg-green-700 bottom-2 right-2 text-3xl p-3 text-white rounded-full'}
      >
        <MdWhatsapp />
      </Link>
    );
  }

  return (
    <>
      {checkComponent()}
      {waButton()}
    </>
  );
}

interface IProps {
  children: ReactNode;
  type: PAGE_TYPE_ENUM;
}
