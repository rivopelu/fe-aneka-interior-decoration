import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { ITableColumn } from '../../../types/type/ITableColumn.ts';
import { IResListOrderAdmin } from '../../../types/response/IResListOrderAdmin.ts';
import Table from '../../../components/Table.tsx';
import { useAdminOrderPage } from './useAdminOrderPage.ts';
import OrderStatusText from '../../../components/OrderStatusText.tsx';
import DateHelper from '../../../helper/date-helper.ts';
import Avatar from '../../../components/Avatar.tsx';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';
import IconButton from '../../../components/IconButton.tsx';
import { MdInfo } from 'react-icons/md';
import Pagination from '../../../components/Pagination.tsx';
import { InputSearch } from '../../../components/InputSearch.tsx';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.ts';

export default function AdminOrderListPage() {
  const page = useAdminOrderPage();
  const dateHelper = new DateHelper();
  const numberFormatHelper = new NumberFormatterHelper();
  const tableColumn: ITableColumn<IResListOrderAdmin>[] = [
    {
      headerTitle: 'ID Pesanan',
      component: (e) => {
        return <div>{e.id}</div>;
      },
    },
    {
      headerTitle: 'Status',
      component: (e) => {
        return (
          <div>
            <OrderStatusText status={e.status} />
          </div>
        );
      },
    },
    {
      headerTitle: 'Tanggal Dibuat',
      component: (e) => {
        return <div>{dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm')}</div>;
      },
    },
    {
      headerTitle: 'Pemesan',
      component: (e) => {
        return (
          <div className={'flex items-center gap-4'}>
            <Avatar size={'sm'} src={e.account_profile_picture} name={e.account_name} />
            <div>
              <p>{e.account_name}</p>
              <p className={'text-gray-400'}>{e.account_email}</p>
            </div>
          </div>
        );
      },
    },
    {
      headerTitle: 'Total Pembayaran',
      component: (e) => {
        return <div>{numberFormatHelper.toRupiah(e.total_payment)}</div>;
      },
    },
    {
      component: (e) => {
        return (
          <Link to={ROUTES.ADMIN.DETAIL_ORDER(e.id)}>
            <IconButton>
              <MdInfo />
            </IconButton>
          </Link>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <PageTitle title={'Management Pesanan'} />
      <div className="grid grid-cols-2">
        <InputSearch
          active={page.activeSearch}
          value={page.searchValue}
          onChange={page.setSearchValue}
          onEnter={page.onSearch}
          onReset={page.onResetSearch}
          placeholder="Cari Id Pesanan"
        />
      </div>
      <Table data={page.dataList} column={tableColumn} loading={page.loading} />
      {page.paginatedData && <Pagination onPageChange={page.onChangePage} data={page.paginatedData} />}
    </PageContainer>
  );
}
