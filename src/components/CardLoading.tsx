import { Card, CardBody } from "./Card";
import { CircularLoading } from "./CircularLoading";
import Flex from "./Flex";

export default function CardLoading() {
  return (
    <Card className={'h-80'}>
      <CardBody className={'h-full'}>
        <Flex justify={'center'} gap={'xl'} align={'center'} direction={'col'} className={'h-full'}>
          <CircularLoading />
          <div>Sedang Memuat data</div>
        </Flex>
      </CardBody>
    </Card>
  );
}
