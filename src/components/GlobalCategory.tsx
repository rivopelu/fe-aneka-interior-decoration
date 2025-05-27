import { ProductAction } from '../redux/actions/product.action.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery.ts';
import { twMerge } from 'tailwind-merge';
import Dropdown from './Dropdown.tsx';
import Button from './Button.tsx';
import { ListGroup, ListItem } from './List.tsx';
import { MdArrowDownward } from 'react-icons/md';

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
    <Dropdown
      toggle={
        <Button variant="outlined" color="white" endIcon={<MdArrowDownward />}>
          Kategory
        </Button>
      }
    >
      <ListGroup>
        {listData.map((item, i) => (
          <ListItem onClick={() => handleClick(item.id)} key={i} className="min-w-xs" label={item.name} />
        ))}
      </ListGroup>
    </Dropdown>
  );
}
