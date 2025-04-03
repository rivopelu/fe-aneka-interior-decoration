import { MdClose, MdSearch, MdSend } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export function InputSearch(props: IProps) {
  return (
    <div>
      <div className="relative ">
        <span className="absolute left-3 top-2 text-gray-400 flex items-center pr-3"><MdSearch /></span>
        <input

          onChange={(e) => props.onChange && props.onChange(e?.target?.value)}
          value={props.value}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && props.onEnter) {
              props.onEnter(props.value || "")
            }
          }}
          placeholder={props.placeholder}
          className={twMerge(
            'py-1 px-3 w-full text-gray-500 duration-300 bg-slate bg-white focus:outline-none focus:outline-0 outline-0 outline-none rounded-md',
            'px-9',
          )}
        />
        <span className="absolute right-0 top-2 text-gray-400 flex items-center pr-3">
          {
            props.active ? <MdClose onClick={props.onReset && props.onReset} className="cursor-pointer" /> : <MdSend className="cursor-pointer" onClick={() => props.onEnter && props.onEnter(props.value || "")} />
          }
        </span>
      </div>
    </div>
  )
}

interface IProps {
  onChange?: (e: string) => void
  value?: string;
  onEnter?: (value: string) => void;
  active?: boolean;
  placeholder?: string;
  onReset?: () => void;
}