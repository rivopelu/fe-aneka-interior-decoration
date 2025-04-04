import { useEffect, useState } from 'react';
import { ProductAction } from '../../redux/actions/product.action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { IResListProduct } from '../../types/response/IResListProduct';
import { CartAction } from '../../redux/actions/cart.action.ts';
import { IReqAddToCart } from '../../types/request/IReqAddToCart.ts';
import { HttpService } from '../../services/http.service.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import ErrorService from '../../services/error.service.ts';
import toast from 'react-hot-toast';

export function useDetailProductPage() {
  const dispatch = useAppDispatch();
  const productAction = new ProductAction();
  const cartAction = new CartAction();
  const errorService = new ErrorService();
  const httpService = new HttpService();
  const Product = useAppSelector((state) => state.Product);
  const data = Product.detailProduct?.data;
  const loading = Product.detailProduct?.loading;
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);

  const [listProduct, setListProduct] = useState<IResListProduct[]>([]);
  const [qty, setQty] = useState<number>(0);

  useEffect(() => {
    dispatch(productAction.listProduct());
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    setQty(0);
    setListProduct([]);
    dispatch(productAction.getDetailProduct(id));
  }, [id]);

  useEffect(() => {
    if (data) {
      if (!Product?.listProduct?.data) return;
      const dataList = Product.listProduct.data.filter((e) => e.id != data.id).splice(0, 5);
      setListProduct(dataList);
    }
  }, [data, Product?.listProduct]);

  function onAddToCart() {
    if (!data?.id) return;
    const reqData: IReqAddToCart = {
      qty: qty,
      id: data.id,
    };
    setLoadingAdd(true);
    httpService
      .POST<IReqAddToCart>(ENDPOINT.ADD_TO_CART(), reqData)
      .then(() => {
        setLoadingAdd(false);
        dispatch(cartAction.getCount()).then();
        toast.success('Produk berhasil di tambahkan ke keranjang');
      })
      .catch((e) => {
        setLoadingAdd(false);

        errorService.fetchApiError(e);
      });
  }

  return { data, loading, qty, setQty, listProduct, onAddToCart, loadingAdd };
}
