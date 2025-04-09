import { useEffect, useState } from 'react';
import { ProductAction } from '../redux/actions/product.action';
import { IProductReducers } from '../redux/reducers/product.reducers';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { IResListProduct } from '../types/response/IResListProduct';
import { useQuery } from '../hooks/useQuery.ts';

export function useHomePage() {
  const dispatch = useAppDispatch();
  const productActions = new ProductAction();
  const Product: IProductReducers = useAppSelector((state) => state.Product);
  const loading = Product.listProduct?.loading;
  const query = useQuery();
  const [searchValue, setSearchValue] = useState<string>(() => query.get('q') || '');
  const [category, setCategory] = useState<string>(() => query.get('category_id') || '');
  const [listData, setListData] = useState<IResListProduct[]>([]);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(10);
  const categoryId = query.get('category_id');

  useEffect(() => {
    setSearchValue(query.get('q') || '');
    setCategory(query.get('category_id') || '');
  }, []);

  useEffect(() => {
    setSearchValue(query.get('q') || '');

  }, [query.get("q")])

  useEffect(() => {
    if (categoryId) {
      fetchData(page, size, '', categoryId);
    } else {
      fetchData(page, size);
    }
  }, [query.get('category_id')]);

  useEffect(() => {
    fetchData(page, size, searchValue);
  }, [searchValue]);

  useEffect(() => {
    fetchData(page, size, '', category);
  }, [category]);

  function fetchData(page: number, size: number, search?: string, category?: string) {
    let queryString = `?page=${page}&size=${size}`;
    if (search) {
      queryString = queryString + `&name=${search}`;
    }
    if (category) {
      queryString = queryString + `?page=${page}&size=${size}&category_id=${category}`;
    }
    console.log(queryString);
    dispatch(productActions.listProduct(queryString));
  }

  useEffect(() => {
    if (searchValue || categoryId) {
      const data = Product?.listProduct?.data || [];
      setListData(data);
    } else {
      const data = Product?.listProduct?.data;

      if (!Array.isArray(data)) return;

      setListData((prevListData) => {
        const newList = [...prevListData];

        data.forEach((item) => {
          if (!newList.some((existingItem) => existingItem.id === item.id)) {
            newList.push(item);
          }
        });

        return newList;
      });
    }
  }, [Product?.listProduct]);
  useEffect(() => {
    fetchData(page, size);
  }, []);

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, size);
  }

  return { listData, loadMore, loading };
}
