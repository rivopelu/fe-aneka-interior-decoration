import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEffect, useState } from 'react';
import { CartAction } from '../../redux/actions/cart.action.ts';
import { IResListCart } from '../../types/response/IResListCart.ts';
import { HttpService } from '../../services/http.service.ts';
import { IReqAddToCart } from '../../types/request/IReqAddToCart.ts';
import { ENDPOINT } from '../../constants/endpoint.ts';
import ErrorService from '../../services/error.service.ts';
import toast from 'react-hot-toast';

export function useCartPage() {
  const dispatch = useAppDispatch();
  const cartAction = new CartAction();
  const httpService = new HttpService();
  const errorService = new ErrorService();
  const Cart = useAppSelector((state) => state.Cart);
  const countCart = Cart?.countCart?.data;
  const loading = Cart?.listCart?.loading;
  const [listCart, setListCart] = useState<IResListCart[]>([]);

  function addCart(productId: string, qty: number) {
    const data: IReqAddToCart = {
      qty: qty,
      id: productId,
    };
    httpService.POST(ENDPOINT.ADD_TO_CART(), data).catch((e) => {
      errorService.fetchApiError(e);
    });
  }

  useEffect(() => {
    if (!Cart?.listCart?.data) return;
    setListCart(Cart?.listCart?.data);
  }, [Cart?.listCart?.data]);

  function fetchCart() {
    dispatch(cartAction.listCart());
  }
  useEffect(() => {
    fetchCart();
  }, []);

  function onReduceQty(cartId: string) {
    const findData = listCart.find((e) => e.cart_id === cartId);
    if (findData && findData.qty !== 0) {
      const newData: IResListCart = {
        ...findData,
        qty: findData.qty - 1,
        total_price: findData.price_per_qty * (findData.qty - 1),
      };
      addCart(newData.product_id, newData.qty);
      const listData = listCart.map((e) => {
        if (e.cart_id === cartId) {
          return newData;
        } else {
          return e;
        }
      });
      setListCart(listData);
    }
  }

  function onAddQty(cartId: string) {
    const findData = listCart.find((e) => e.cart_id === cartId);
    if (findData) {
      const newData: IResListCart = {
        ...findData,
        qty: findData.qty + 1,
        total_price: findData.price_per_qty * (findData.qty + 1),
      };
      addCart(newData.product_id, newData.qty);
      const listData = listCart.map((e) => {
        if (e.cart_id === cartId) {
          return newData;
        } else {
          return e;
        }
      });
      setListCart(listData);
    }
  }

  return { countCart, listCart, onAddQty, onReduceQty, loading };
}
