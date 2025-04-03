import { Route, Routes } from 'react-router-dom';
import { adminRouteList, RouteList } from './route-list.ts';
import Base from '../components/Base.tsx';

export default function RouteBuilder() {
  return (
    <Routes>
      {[...RouteList, ...adminRouteList].map((item, i) => {
        const Element = item.elements;
        return (
          <Route
            key={i}
            path={item.route}
            element={
              <Base type={item.type}>
                <Element />
              </Base>
            }
          />
        );
      })}
    </Routes>
  );
}
