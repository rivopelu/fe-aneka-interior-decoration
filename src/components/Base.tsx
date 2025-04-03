import { ReactNode } from 'react';
import { PAGE_TYPE_ENUM } from '../enums/page-type-enum.ts';
import TopBar from './TopBar.tsx';

export default function Base(props: IProps) {
  function checkComponent() {
    switch (props.type) {
      case PAGE_TYPE_ENUM.PRIMARY:
        return (
          <div>
            <TopBar />
            <div>{props.children}</div>
          </div>
        );
      case PAGE_TYPE_ENUM.DASHBOARD:
        return (
          <div>
            <h1>DASHBOARD</h1>
            <div>{props.children}</div>
          </div>
        );
      default:
        return <>{props.children}</>;
    }
  }

  return <>{checkComponent()}</>;
}

interface IProps {
  children: ReactNode;
  type: PAGE_TYPE_ENUM;
}
