import { IBreadcrumbData } from '../types/type/IBreadcrumbData';
import Breadcrumbd from './Breadcrumbs';

export function PageTitle(props: IProps) {
  function getListBreadcrumb(): IBreadcrumbData[] {
    if (props.breadcrumb) {
      return props.breadcrumb;
    } else {
      return [];
    }
  }
  const breadCrumbData: IBreadcrumbData[] = [
    ...getListBreadcrumb(),
  ];
  return (
    <div>
      {
        props.breadcrumb &&
        <Breadcrumbd breadCrumbData={breadCrumbData} />
      }
      <h3 className={'text-2xl capitalize'}>{props.title}</h3>
    </div>
  );
}

interface IProps {
  title?: string;
  breadcrumb?: IBreadcrumbData[];
}
