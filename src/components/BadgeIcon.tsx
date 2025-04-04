// components/Badge.tsx
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  count?: number;
  children: ReactNode;
  className?: string;
}

export default function BadgeIcon({ count, children, className }: BadgeProps) {
  return (
    <div className="relative inline-block">
      {children}
      {count && count > 0 && (
        <span
          className={twMerge(
            'absolute -bottom-1 -right-1 min-w-[18px] h-[18px] px-1 text-xs text-white bg-red-600 rounded-full flex items-center justify-center',
            className,
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
}
