import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { useAdminAccountPage } from './useAdminAccountPage.ts';
import { ITableColumn } from '../../../types/type/ITableColumn.ts';
import { IResListAccount } from '../../../types/response/IResListAccount.ts';
import Avatar from '../../../components/Avatar.tsx';
import Table from '../../../components/Table.tsx';
import { twMerge } from 'tailwind-merge';
import DateHelper from '../../../helper/date-helper.ts';
import IconButton from '../../../components/IconButton.tsx';
import { MdInfo } from 'react-icons/md';
import Pagination from '../../../components/Pagination.tsx';

export default function AdminAccountPage() {
  const page = useAdminAccountPage();
  const dateHelper = new DateHelper();

  const tableColumns: ITableColumn<IResListAccount>[] = [
    {
      headerTitle: 'Akun',
      component: (e) => (
        <div className={'flex items-center gap-3'}>
          <Avatar src={e.profile_picture} name={e.name} alt={e.name} />
          <div>
            <p>{e.name}</p>
            <p className={'text-gray-500'}>{e.email}</p>
          </div>
        </div>
      ),
    },
    {
      headerTitle: 'Role',
      component: (e) => (
        <div className={twMerge('font-semibold', e.role === 'ADMIN' ? 'text-green-700' : 'text-blue-700')}>
          {e.role}
        </div>
      ),
    },
    {
      headerTitle: 'Tanggal Mendaftar',
      component: (e) => <div>{dateHelper.toFormatDate(new Date(e.created_date), 'dd LLLL, yyyy - HH:mm')}</div>,
    },
    {
      component: () => (
        <div>
          <IconButton>
            <MdInfo />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageTitle title="Management Akun" />
      <Table data={page.dataList} column={tableColumns} loading={page.loading} />
      {page.paginatedData && <Pagination data={page.paginatedData} onPageChange={page.onChangePage} />}
    </PageContainer>
  );
}
