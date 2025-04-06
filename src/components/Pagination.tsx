import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { IResPaginatedData } from '../types/response/IResModel';
import { IPaginatedChange } from '../types/type/IPaginatedChange';
import { scrollToTop } from '../utils/scrool-to-top';
import { Card, CardBody } from './Card';

interface PaginationProps {
  data: IResPaginatedData;
  onPageChange: ({ page, size }: IPaginatedChange) => void;
}

export default function Pagination({ data, onPageChange }: PaginationProps) {
  const visiblePages = 3;
  const { page, page_count } = data;
  const pages: (number | string)[] = [];

  if (page_count <= 5) {
    for (let i = 1; i <= page_count; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (page > visiblePages + 3) pages.push('...');

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(page_count - 1, page + 3);
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (page < page_count - visiblePages) pages.push('...');
    pages.push(page_count);
  }

  const handlePageChange = (newPage: number) => {
    scrollToTop();
    if (newPage >= 0 && newPage <= page_count) {
      onPageChange({ size: data.size, page: newPage });
    }
  };
  return (
    <Card>
      <CardBody>
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === page_count}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{(page + 1) * 10}</span> dari{' '}
              <span className="font-medium">{data.total_data}</span> data
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="relative inline-flex items-center rounded-l-md px-3 cursor-pointer py-2 text-gray-400 ring-1  ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <MdArrowBack />
              </button>

              {pages.map((p, index) =>
                typeof p === 'number' ? (
                  <button
                    key={index}
                    onClick={() => handlePageChange(p - 1)}
                    className={twMerge(
                      `relative inline-flex cursor-pointer items-center px-4  py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0`,
                      p === page + 1
                        ? 'z-10 bg-primary-main hover:bg-primary-light text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
                        : 'text-gray-900',
                    )}
                  >
                    {p}
                  </button>
                ) : (
                  <span
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                  >
                    {p}
                  </span>
                ),
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === page_count}
                className="relative  inline-flex items-center rounded-r-md px-3 cursor-pointer py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <MdArrowForward />
              </button>
            </nav>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
