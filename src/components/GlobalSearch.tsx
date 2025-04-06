import { InputSearch } from './InputSearch.tsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery.ts';

export default function GlobalSearch() {
  const query = useQuery();

  const [searchValue, setSearchValue] = useState<string>(() => query.get('q') || '');
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState<boolean>(!!location.search);
  useEffect(() => {
    setActiveSearch(!!location.search);
  }, [location.search]);
  function onSubmitSearch(v: string) {
    if (v) {
      navigate(`/?q=${v}`);
    } else {
      onResetSearch();
    }
  }

  function onResetSearch() {
    navigate(`/`);
    setSearchValue('');
  }
  return (
    <InputSearch
      onEnter={onSubmitSearch}
      placeholder={'Cari Nama Produk'}
      onChange={setSearchValue}
      onReset={onResetSearch}
      value={searchValue}
      active={activeSearch}
    />
  );
}
