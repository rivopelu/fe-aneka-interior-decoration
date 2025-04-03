import { twMerge } from 'tailwind-merge';

export default function BrandLogo({ type = 'dark' }: IProps) {
  return (
    <div>
      <h2
        className={twMerge('text-xl font-semibold uppercase ', type === 'dark' ? 'text-primary-main ' : 'text-white')}
      >
        Aneka Interior Decoration
      </h2>
    </div>
  );
}

interface IProps {
  type?: 'light' | 'dark';
}
