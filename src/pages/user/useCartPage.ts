import { useAppDispatch, useAppSelector } from '../../redux/store.ts';
import { useEffect, useState } from 'react';
import { CartAction } from '../../redux/actions/cart.action.ts';
import { IResListCart } from '../../types/response/IResListCart.ts';

export function useCartPage() {
  const dispatch = useAppDispatch();
  const cartAction = new CartAction();
  const Cart = useAppSelector((state) => state.Cart);
  const countCart = Cart?.countCart?.data;
  const [listCart, setListCart] = useState<IResListCart[]>([]);

  useEffect(() => {
    if (!Cart?.listCart?.data) return;
    setListCart(Cart?.listCart?.data);
  }, [Cart?.listCart?.data]);

  useEffect(() => {
    dispatch(cartAction.listCart());
  }, []);

  function onReduceQty(cartId: string) {
    const findData = listCart.find((e) => e.cart_id === cartId);
    if (findData && findData.qty !== 0) {
      const newData: IResListCart = {
        ...findData,
        qty: findData.qty - 1,
        total_price: findData.price_per_qty * (findData.qty - 1),
      };
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

  return { countCart, listCart, onAddQty, onReduceQty };
}
