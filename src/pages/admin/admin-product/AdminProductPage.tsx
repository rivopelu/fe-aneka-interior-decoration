import { MdArchive, MdDelete, MdEdit, MdInfo } from 'react-icons/md';
import IconButton from '../../../components/IconButton';
import { InputSearch } from '../../../components/InputSearch';
import PageContainer from '../../../components/PageContainer';
import Pagination from '../../../components/Pagination';
import Table from '../../../components/Table';
import DateHelper from '../../../helper/date-helper';
import { NumberFormatterHelper } from '../../../helper/number-format-helper';
import { IResListProduct } from '../../../types/response/IResListProduct';
import { ITableColumn } from '../../../types/type/ITableColumn';
import Button from '../../../components/Button';
import { useAdminProductPage } from './useAdminProductPage';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import Tooltip from '../../../components/Tooltip.tsx';
import PopupQuestion from '../../../components/PopupQuestion.tsx';

export default function AdminProductPage() {
  const page = useAdminProductPage();
  const numberFormat = new NumberFormatterHelper();
  const dateHelper = new DateHelper();

  const column: ITableColumn<IResListProduct>[] = [
    {
      headerTitle: 'Produk',
      component: (e) => (
        <div className="flex gap-3 max-w-xl">
          <img src={e.image} alt={e.name} className="object-cover h-20 aspect-square" />
          <div>
            <div>
              {e.name} {!e?.active && <span className={'text-red-800'}>(diarsipkan)</span>}
            </div>
            <div className="text-sm text-gray-500 line-clamp-2">{e.description}</div>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Kategory',
      component: (e) => <div>{e.category_name}</div>,
    },
    {
      headerTitle: 'Tanggal Di Buat',
      component: (e) => (
        <div>{e.created_date ? dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm') : '-'}</div>
      ),
    },
    {
      headerTitle: 'Harga',
      component: (e) => <div>{numberFormat.toRupiah(e.price)}</div>,
    },
    {
      component: (e) => (
        <div className="px-10 flex gap-3 items-center">
          {e?.active ? (
            <Tooltip content={'Arsipkan Produk'}>
              <IconButton className="text-red-700" onClick={() => page.setSelectedProductDelete(e)}>
                <MdDelete />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip content={'Keluarkan dari arsip'}>
              <IconButton className="text-green-700" onClick={() => page.setSelectedProductDelete(e)}>
                <MdArchive />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip content={'Detail Produk'}>
            <Link to={ROUTES.DETAIL_PRODUCT(e.id)}>
              <IconButton className="text-primary-main">
                <MdInfo />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content={'Edit Produk'}>
            <Link to={ROUTES.ADMIN.EDIT_PRODUCT(e.id)}>
              <IconButton className="text-primary-main">
                <MdEdit />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <PopupQuestion
        loading={page.loadingArchive}
        onSubmit={page.onArchive}
        onClose={() => page.setSelectedProductDelete(undefined)}
        title={page.selectedProductDelete?.active ? 'Arsipkan produk' : 'keluarkan produk dari arsip'}
        description={
          page?.selectedProductDelete?.active
            ? 'Produk yang diarsipkan akan hilang dari katalog produk yang dilihat user, tetapi seluruh proses transaksi yang sudah berjalan tetapi berlanjut'
            : undefined
        }
        open={!!page.selectedProductDelete}
      />
      <PageContainer>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl">Product Management</h3>
          <Link to={ROUTES.ADMIN.NEW_PRODUCT()}>
            <Button>Buat produk baru</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <InputSearch
            active={page.activeSearch}
            value={page.searchValue}
            onChange={page.setSearchValue}
            onEnter={page.onSearch}
            onReset={page.onResetSearch}
            placeholder="Cari nama produk"
          />
        </div>
        <Table column={column} data={page.listData} loading={page.loading} />
        {page.paginatedData && <Pagination onPageChange={page.onChangePage} data={page.paginatedData} />}
      </PageContainer>
    </div>
  );
}
