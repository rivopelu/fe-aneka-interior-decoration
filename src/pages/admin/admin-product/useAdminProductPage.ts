import { useEffect, useState } from 'react';
import { ProductAction } from '../../../redux/actions/product.action';
import { IProductReducers } from '../../../redux/reducers/product.reducers';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { IResListProduct } from '../../../types/response/IResListProduct';
import { IPaginatedChange } from '../../../types/type/IPaginatedChange';
import { HttpService } from '../../../services/http.service.ts';
import ErrorService from '../../../services/error.service.ts';
import { ENDPOINT } from '../../../constants/endpoint.ts';
import toast from 'react-hot-toast';

export function useAdminProductPage() {
  const dispatch = useAppDispatch();
  const productActions = new ProductAction();
  const Product: IProductReducers = useAppSelector((state) => state.Product);
  const loading = Product.listProduct?.loading;
  const paginatedData = Product?.listProduct?.paginated_data;
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const [searchValue, setSearchValue] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [selectedProductDelete, setSelectedProductDelete] = useState<IResListProduct | undefined>(undefined);
  const [listData, setListData] = useState<IResListProduct[]>([]);
  const [loadingArchive, setLoadingArchive] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  function fetchData(page: number, size: number, name?: string) {
    let queryString = `?page=${page}&size=${size}`;
    if (name) {
      queryString = queryString + `&name=${name}`;
    }
    setPage(page);
    setSize(size);
    dispatch(productActions.listProductAdmin(queryString));
  }
  useEffect(() => {
    fetchData(page, size);
  }, []);

  function onSearch(e: string) {
    fetchData(0, 10, e);
    setActiveSearch(true);
  }

  function onResetSearch() {
    fetchData(page, size);
    setSearchValue('');
    setActiveSearch(false);
  }

  useEffect(() => {
    const data = Product.listProduct?.data;
    if (!data) return;
    setListData(data);
  }, [Product?.listProduct?.data]);

  function onChangePage(e: IPaginatedChange) {
    fetchData(e.page, e.size);
  }

  function onArchive() {
    if (selectedProductDelete) {
      setLoadingArchive(true);
      httpService
        .DELETE(ENDPOINT.ARCHIVE_PRODUCT(selectedProductDelete.id))
        .then(() => {
          setSelectedProductDelete(undefined);
          setLoadingArchive(false);
          toast.success(
            selectedProductDelete?.active ? 'Produk berhasil diarsipkan' : 'Produk berhasil dikeluarkan dari arsip',
          );
          fetchData(page, size);
        })
        .catch((err) => {
          setLoadingArchive(false);
          errorService.fetchApiError(err);
        });
    }
  }

  return {
    listData,
    activeSearch,
    searchValue,
    setSearchValue,
    loading,
    paginatedData,
    onChangePage,
    onSearch,
    onResetSearch,
    selectedProductDelete,
    setSelectedProductDelete,
    onArchive,
    loadingArchive,
  };
}
