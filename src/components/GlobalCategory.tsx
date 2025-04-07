import { ProductAction } from '../redux/actions/product.action.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery.ts';
import { twMerge } from 'tailwind-merge';

export default function GlobalCategory() {
  const productAction = new ProductAction();
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.Product);
  const listData = Product?.listCategory?.data || [];
  const query = useQuery();

  useEffect(() => {
    dispatch(productAction.listCategory());
  }, []);
  const categoryId = query.get('category_id');
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    const q = query.get('category_id');

    if (q === id) {
      navigate({ search: '', pathname: '/' });
    } else {
      navigate({ pathname: '', search: `?category_id=${id}` });
    }
  };
  return (
    <div className={'flex text-gray-300 gap-12 justify-between'}>
      {listData.map((item, i) => (
        <div
          onClick={() => handleClick(item.id)}
          className={twMerge(
            `${categoryId === item.id ? 'text-white cur underline font-semibold' : ' '} cursor-pointer`,
          )}
          key={i}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
