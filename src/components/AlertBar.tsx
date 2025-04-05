import { MdClose } from 'react-icons/md';

interface IProps {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
}

const variantStyles = {
  info: {
    border: 'border-blue-200',
    text: 'text-blue-800',
    bg: 'bg-blue-50',
    icon: (
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
    ),
    srText: 'Info',
  },
  success: {
    border: 'border-green-200',
    text: 'text-green-800',
    bg: 'bg-green-50',
    icon: (
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
    ),
    srText: 'Success',
  },
  error: {
    border: 'border-red-200',
    text: 'text-red-800',
    bg: 'bg-red-50',
    icon: <MdClose />,
    srText: 'Error',
  },
  warning: {
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    bg: 'bg-yellow-50',
    icon: (
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      </svg>
    ),
    srText: 'Warning',
  },
};

export default function AlertBar(props: IProps) {
  const variant = props.variant || 'info';
  const styles = variantStyles[variant];

  return (
    <div className={''}>
      <div
        className={`flex items-center p-4 mb-4 text-sm border rounded-lg ${styles.border} ${styles.text} ${styles.bg}`}
        role="alert"
      >
        <div className={'w-10 h-10 flex items-center justify-center rounded-full '}>{styles.icon}</div>
        <span className="sr-only">{styles.srText}</span>
        <div>
          <div>{props.title}</div>
          {props.description && <p className="text-xs">{props.description}</p>}
        </div>
      </div>
    </div>
  );
}
