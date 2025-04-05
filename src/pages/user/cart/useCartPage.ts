import { useAppDispatch, useAppSelector } from '../../../redux/store.ts';
import { useEffect, useState } from 'react';
import { CartAction } from '../../../redux/actions/cart.action.ts';
import { IResListCart } from '../../../types/response/IResListCart.ts';
import { HttpService } from '../../../services/http.service.ts';
import { IReqAddToCart } from '../../../types/request/IReqAddToCart.ts';
import { ENDPOINT } from '../../../constants/endpoint.ts';
import ErrorService from '../../../services/error.service.ts';
import toast from 'react-hot-toast';
import { AccountActions } from '../../../redux/actions/account.actions.ts';
import { IResListShippingAddress } from '../../../types/response/IResListShippingAddress.ts';
import { BaseResponse } from '../../../types/response/IResModel.ts';
import { IResCheckDeliveryFee } from '../../../types/response/IResCheckDeliveryFee.ts';
import { IReqCreateOrder } from '../../../types/request/IReqCreateOrder.ts';

export function useCartPage() {
  const dispatch = useAppDispatch();
  const cartAction = new CartAction();
  const httpService = new HttpService();
  const accountAction = new AccountActions();
  const errorService = new ErrorService();
  const Cart = useAppSelector((state) => state.Cart);
  const Account = useAppSelector((state) => state.Account);
  const countCart = Cart?.countCart?.data;
  const loading = Cart?.listCart?.loading;
  const listAddress = Account?.listAddress?.data || [];
  const loadingAddress = Account?.listAddress?.loading;

  const [listCart, setListCart] = useState<IResListCart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loadingCheckDelivery, setLoadingCheckDelivery] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IResListShippingAddress | undefined>(undefined);
  const [listDeliveryService, setListDeliveryService] = useState<IResCheckDeliveryFee[] | undefined>(undefined);
  const [selectedDeliveryService, setSelectedDeliveryService] = useState<IResCheckDeliveryFee | undefined>(undefined);
  const [dataCreateOrder, setDataCreateOrder] = useState<IReqCreateOrder | undefined>();
  const [openModalCreateOrder, setOpenModalCreateOrder] = useState<boolean>(false);
  const [loadingCreateOrder, setLoadingCreateOrder] = useState<boolean>(false);
  const [showModalPayment, setShowModalPayment] = useState<boolean>(false);

  useEffect(() => {
    if (listCart.length) {
      const dataPrice = listCart.map((e) => e.total_price);
      const sum = dataPrice.reduce((acc, curr) => acc + curr, 0);
      setTotalPrice(sum);
    }
  }, [listCart]);

  function onSubmitCreateOrder() {
    if (dataCreateOrder) {
      setLoadingCreateOrder(true);
      httpService
        .POST(ENDPOINT.CREATE_ORDER(), dataCreateOrder)
        .then(() => {
          dispatch(cartAction.getCount()).then();
          setLoadingCreateOrder(false);
          toast.success('Pesananmu berhasil dibuat');
          setShowModalPayment(true);
          setOpenModalCreateOrder(false);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingCreateOrder(false);
        });
    }
  }

  function addCart(productId: string, qty: number) {
    const data: IReqAddToCart = {
      qty: qty,
      id: productId,
    };
    httpService.POST(ENDPOINT.ADD_TO_CART(), data).catch((e) => {
      errorService.fetchApiError(e);
    });
  }

  function removeCart(chartId: string) {
    httpService
      .DELETE(ENDPOINT.REMOVE_CHART_ITEM(chartId))
      .then(() => {
        fetchCart();
        dispatch(cartAction.getCount()).then();
        toast.success('Item berhasil dihapus');
      })
      .catch((e) => {
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
    dispatch(accountAction.getListAddress());
  }, []);

  function onReduceQty(cartId: string) {
    const findData = listCart.find((e) => e.cart_id === cartId);
    if (findData && findData.qty !== 0) {
      const newData: IResListCart = {
        ...findData,
        qty: findData.qty - 1,
        total_price: findData.price_per_qty * (findData.qty - 1),
      };
      if (newData.qty === 0) {
        removeCart(newData.cart_id);
      } else {
        addCart(newData.product_id, newData.qty);
      }
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

  function onCheckDeliveryFee() {
    if (selectedAddress) {
      setLoadingCheckDelivery(true);
      httpService
        .GET(ENDPOINT.CHECK_DELIVERY_FEE(selectedAddress.destination_code))
        .then((res: BaseResponse<IResCheckDeliveryFee[]>) => {
          setListDeliveryService(res.data.response_data);
          setLoadingCheckDelivery(false);
        })
        .catch((e) => {
          errorService.fetchApiError(e);
          setLoadingCheckDelivery(false);
        });
    }
  }

  function onClickBuyNow() {
    if (selectedDeliveryService && selectedAddress?.id) {
      setOpenModalCreateOrder(true);
      const dataOrder = listCart.map((e) => {
        return {
          qty: e.qty,
          id: e.product_id,
        };
      });
      setDataCreateOrder({
        delivery_cost: selectedDeliveryService.cost,
        delivery_service_name: selectedDeliveryService.service_name,
        delivery_service_description: selectedDeliveryService.description,
        delivery_service_estimated: selectedDeliveryService.estimated,
        shipping_address_id: selectedAddress.id,
        products: dataOrder,
      });
    }
  }

  return {
    countCart,
    openModalCreateOrder,
    setOpenModalCreateOrder,
    listCart,
    onAddQty,
    onReduceQty,
    loading,
    removeCart,
    totalPrice,
    listAddress,
    loadingAddress,
    setSelectedAddress,
    onCheckDeliveryFee,
    selectedAddress,
    listDeliveryService,
    loadingCheckDelivery,
    setListDeliveryService,
    setSelectedDeliveryService,
    selectedDeliveryService,
    onSubmitCreateOrder,
    onClickBuyNow,
    loadingCreateOrder,
    showModalPayment,
    setShowModalPayment,
  };
}
