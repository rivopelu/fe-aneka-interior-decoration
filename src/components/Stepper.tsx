import { twMerge } from 'tailwind-merge';

interface IProps {
  data: string[];
  activeStepIndex: number;
}

export default function Stepper({ data, activeStepIndex }: IProps) {
  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
      {data.map((step, index) => {
        const isActive = index <= activeStepIndex;
        const isLast = index === data.length - 1;

        const liClasses = twMerge(
          "flex items-center",
          !isLast && "md:w-full",
          isActive && "text-primary-main dark:text-primary-main",
          !isLast && "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
          isActive && "after:bg-primary-main"
        );

        const spanClasses = twMerge(
          "flex items-center",
          !isLast && "after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
        );

        return (
          <li key={index} className={liClasses}>
            <span className={spanClasses}>
              {index === 0 && isActive ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
              ) : (
                <span className="me-2">{index + 1}</span>
              )}
              {step.split(' ')[0]}
              <span className="hidden sm:inline-flex sm:ms-2">
                {step.split(' ').length > 1 ? step.split(' ').slice(1).join(' ') : ''}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}