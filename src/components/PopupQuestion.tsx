import PopupModal from './PopupModal.tsx';
import { Card, CardBody } from './Card.tsx';
import Flex from './Flex.tsx';
import Divider from './Divider.tsx';
import Grid from './Grid.tsx';
import Button from './Button.tsx';

function PopupQuestion(props: IProps) {
  function bodyModalSubmit() {
    return (
      <Card className="w-md">
        <CardBody className={'p-10'}>
          <Flex gap={'xl'} align={'center'} direction={'col'} justify={'center'}>
            <div className={'text-xl text-center '}>{props.title}</div>
            {props?.img && <img className={'h-32'} src={props.img} alt={'confirmation'} />}
          </Flex>
        </CardBody>
        <Divider />
        <CardBody>
          <Grid grid={2} gap="sm">
            <Button onClick={props.onClose} variant={'outlined'}>
              Batal
            </Button>
            <Button onClick={props.onSubmit} loading={props.loading}>
              ya
            </Button>
          </Grid>
        </CardBody>
      </Card>
    );
  }

  return <PopupModal onClose={props.onClose} component={bodyModalSubmit()} open={props.open} />;
}

export default PopupQuestion;

interface IProps {
  open?: boolean;
  title: string;
  img?: string;
  onClose?: () => void;
  loading?: boolean;
  onSubmit?: () => void;
}
