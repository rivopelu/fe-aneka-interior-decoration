import { ORDER_STATUS_ENUM } from "../enums/order-status-enum"
import { twMerge } from "tailwind-merge"

export default function OrderStatusText(props: IProps) {
  const statusClass = getStatusClass(props.status)

  return (
    <div className={twMerge(" font-semibold ", statusClass)}>
      {formatStatus(props.status as string)}
    </div>
  )
}

function formatStatus(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

interface IProps {
  status: ORDER_STATUS_ENUM
}

function getStatusClass(status: ORDER_STATUS_ENUM): string {
  switch (status) {
    case ORDER_STATUS_ENUM.WAITING_PAYMENT:
      return " text-yellow-700"
    case ORDER_STATUS_ENUM.PENDING:
      return " text-orange-700"
    case ORDER_STATUS_ENUM.REJECTED:
      return " text-red-700"
    case ORDER_STATUS_ENUM.IN_PROGRESS:
      return " text-blue-700"
    case ORDER_STATUS_ENUM.ON_DELIVERY:
      return " text-indigo-700"
    case ORDER_STATUS_ENUM.COMPLETED:
      return " text-green-700"
    default:
      return " text-gray-700"
  }
}