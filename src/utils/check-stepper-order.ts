import { ORDER_STATUS_ENUM } from '../enums/order-status-enum.ts';

export function checkActiveStepOrder(status: ORDER_STATUS_ENUM) {
  switch (status) {
    case ORDER_STATUS_ENUM.WAITING_PAYMENT:
      return 0;
    case ORDER_STATUS_ENUM.PENDING:
      return 1;
    case ORDER_STATUS_ENUM.IN_PROGRESS:
      return 2;
    case ORDER_STATUS_ENUM.ON_DELIVERY:
      return 3;
    case ORDER_STATUS_ENUM.COMPLETED:
      return 5;
    default:
      return 0;
  }
}
