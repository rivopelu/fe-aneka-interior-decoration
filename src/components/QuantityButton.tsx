import { MdAdd, MdHorizontalRule } from 'react-icons/md';

export default function QuantityButton(props: IProps) {
  return (
    <div className="flex rounded-xs w-[70%] justify-between items-center border border-gray-300 ">
      <button
        onClick={() => props.quantity != 0 && props.onReduceQty && props.onReduceQty()}
        className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer active:bg-gray-200 duration-200 border-r border-gray-300"
      >
        <MdHorizontalRule />
      </button>
      <div>{props?.quantity || 0}</div>
      <button
        onClick={props.onAddQty && props.onAddQty}
        className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer active:bg-gray-200 duration-200 border-l border-gray-300"
      >
        <MdAdd />
      </button>
    </div>
  );
}

interface IProps {
  onAddQty?: () => void;
  onReduceQty?: () => void;
  quantity?: number;
}
