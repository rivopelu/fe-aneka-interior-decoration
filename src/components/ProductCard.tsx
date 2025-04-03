import { NumberFormatterHelper } from "../helper/number-format-helper"
import { IResListProduct } from "../types/response/IResListProduct"
import { Card, CardBody } from "./Card"

export default function ProductCard(props: IProps) {
  const numberFormatHelper = new NumberFormatterHelper()
  return (
    <Card className="hover:border-primary-300 hover:shadow-md hover:shadow-primary-400/20 duration-200 cursor-pointer hover:bg-primary-50/5 hover:-translate-y-2 active:hover:-translate-y-3 active:bg-primary-100">
      <CardBody>
        <img draggable={false} src={props.data.image} alt={props.data.name} className="aspect-square object-cover" />
        <div className="text-sm mt-2 line-clamp-1 ">{props.data.name}</div>
        <p className="line-clamp-2 text-xs text-gray-400">{props.data.description}</p>
        <div className="mt-3">
          <div className="font-semibold text-primary-dark">{numberFormatHelper.toRupiah(props.data.price)}</div>
        </div>
      </CardBody>
    </Card>
  )
}

interface IProps {
  data: IResListProduct
}