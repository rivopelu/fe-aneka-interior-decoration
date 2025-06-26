import { Card, CardBody } from './Card.tsx';
import * as React from 'react';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function ListGroup(props: IPropsGroup) {
  return (
    <Card>
      <CardBody className={'p-1 grid gap-1  min-w-[140px] '}>
        <div className={'cursor-pointer'}>{props.children}</div>
      </CardBody>
    </Card>
  );
}

export function ListItem(props: IPropsItem) {
  return (
    <div
      onClick={props.onClick && props.onClick}
      className={twMerge(
        ' rounded-md py-2 px-4 capitalize active:border-primary-main/20 border border-transparent flex items-center gap-2 text-gray-500 hover:bg-primary-main/10 duration-200',
        props.active ? 'text-primary-light' : '',
        props?.className,
      )}
    >
      {props.icon && props.icon}
      <div>{props.label}</div>
    </div>
  );
}

interface IPropsItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

interface IPropsGroup {
  children?: React.ReactNode;
}

interface IPropsItemNested {
  label: string;
  icon?: ReactNode;
  nestedItems?: Array<{
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
  }>;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
}

export function ListItemNested(props: IPropsItemNested) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    // Delay collapse to allow smooth transition and navigation to nested items
    const timeout = setTimeout(() => {
      setIsExpanded(false);
    }, 250);
    setTimeoutId(timeout);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div
      className={twMerge('relative group', props.className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Item */}
      <div
        className={twMerge(
          'rounded-md py-2 px-4 capitalize border border-transparent flex items-center justify-between text-gray-500 cursor-pointer',
          'transition-all duration-300 ease-in-out',
          'hover:bg-gradient-to-r hover:from-primary-main/10 hover:to-primary-main/5',
          'hover:border-primary-main/20 hover:shadow-sm hover:text-primary-main',
          'group-hover:transform group-hover:scale-[1.02]',
          props.active && 'text-primary-light bg-primary-main/10 border-primary-main/20',
          isExpanded &&
            'bg-gradient-to-r from-primary-main/10 to-primary-main/5 border-primary-main/20 text-primary-main shadow-sm',
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {props.icon && <div className="transition-all duration-300 group-hover:scale-110">{props.icon}</div>}
          <div className="font-medium">{props.label}</div>
        </div>

        {/* Expand/Collapse Icon */}
        {props.nestedItems && props.nestedItems.length > 0 && (
          <div className={twMerge('transition-all duration-300 ease-in-out ml-2', isExpanded && 'rotate-180')}>
            {isExpanded
              ? props.collapseIcon || (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )
              : props.expandIcon || (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
          </div>
        )}
      </div>

      {/* Nested Items */}
      <div
        className={twMerge(
          'overflow-hidden transition-all duration-300 ease-in-out ml-4',
          isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0',
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.nestedItems && props.nestedItems.length > 0 && (
          <div className="space-y-1 pl-4 border-l-2 border-primary-main/20">
            {props.nestedItems.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  'py-1.5 px-3 rounded-md cursor-pointer',
                  'transition-all duration-200 ease-in-out',
                  'hover:bg-primary-main/5 hover:text-primary-main',
                  'hover:transform hover:translate-x-1 hover:shadow-sm',
                  'flex items-center gap-2 text-sm text-gray-600',
                )}
                onClick={item.onClick}
                onMouseEnter={handleMouseEnter}
              >
                <div className="w-1.5 h-1.5 bg-primary-main/60 rounded-full transition-all duration-200 hover:bg-primary-main"></div>
                {item.icon && <div className="transition-all duration-200 hover:scale-110">{item.icon}</div>}
                <div className="capitalize">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
