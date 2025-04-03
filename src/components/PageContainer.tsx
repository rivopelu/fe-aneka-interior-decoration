import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PageContainer(props: IProps) {
  return <div className={twMerge('max-w-7xl mx-auto', props.className)}>{props.children}</div>;
}

interface IProps {
  children: ReactNode;
  className?: string;
}
