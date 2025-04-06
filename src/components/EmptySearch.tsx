import { Card, CardBody } from './Card.tsx';

export default function EmptySearch() {
  return (
    <Card className={'flex-1 w-full h-56'}>
      <CardBody className={'flex items-center justify-center h-full'}>
        <div className={'flex items-center justify-center'}>
          <h1 className={'font-semibold text-primary-main'}>Tidak ada data yang ditemukan</h1>
        </div>
      </CardBody>
    </Card>
  );
}
