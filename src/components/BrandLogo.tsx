import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

export default function BrandLogo({ type = 'dark' }: IProps) {
  return (
    <Link to={'/'}>
      <h2
        className={twMerge('text-xl font-semibold uppercase ', type === 'dark' ? 'text-primary-main ' : 'text-white')}
      >
        Aneka Interior Decoration
      </h2>
    </Link>
  );
}

interface IProps {
  type?: 'light' | 'dark';
}
