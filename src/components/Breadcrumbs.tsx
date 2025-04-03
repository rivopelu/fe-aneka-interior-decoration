import { MdArrowForwardIos } from "react-icons/md";
import { IBreadcrumbData } from "../types/type/IBreadcrumbData";
import { Link } from "react-router-dom";

export default function Breadcrumbd({ breadCrumbData }: IProps) {
  return (
    <div className={'flex  text-gray-500 mb-3'}>
      {breadCrumbData.map((item, i) => (
        <div key={i} className={'flex items-center '}>
          <>
            {breadCrumbData.length - 1 !== i ? (
              <Link className={'capitalize'} to={item?.path || ''}>
                {item.label}
              </Link>
            ) : (
              <div className={'text-black capitalize'}>{item.label}</div>
            )}
          </>
          {breadCrumbData && i !== breadCrumbData.length - 1 && (
            <span className={'pr-2 pl-4'}>
              <MdArrowForwardIos className={'text-sm'} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

interface IProps {
  breadCrumbData: IBreadcrumbData[]
}