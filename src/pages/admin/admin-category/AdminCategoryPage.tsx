import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { Card, CardBody } from '../../../components/Card';
import IconButton from '../../../components/IconButton';
import PageContainer from '../../../components/PageContainer';
import { PageTitle } from '../../../components/PageTItle';
import { useAdminCategoryPage } from './useAdminCategoryPage';
import Button from '../../../components/Button';
import PopupModal from '../../../components/PopupModal';
import Divider from '../../../components/Divider';
import InputText from '../../../components/InputText';
import { FormikProvider } from 'formik';

export default function AdminCategoryPage() {
  const page = useAdminCategoryPage();
  function bodyModalForm() {
    return (
      <Card>
        <CardBody>{page.formik.values.id ? <div>Edit Category</div> : <div>Buat Category baru</div>}</CardBody>
        <Divider />
        <CardBody className="min-w-sm">
          <div>
            <FormikProvider value={page.formik}>
              <InputText required id="name" name="name" label="Nama" placeholder="Masukan nama category" />
            </FormikProvider>
          </div>
        </CardBody>
        <Divider />
        <CardBody className="grid grid-cols-2 gap-2">
          <Button color="error">BATAL</Button>
          <Button
            loading={page.loadingForm}
            onClick={() => page.formik.handleSubmit()}
            disable={!page.formik.values.name}
          >
            KIRIM
          </Button>
        </CardBody>
      </Card>
    );
  }
  return (
    <div>
      <PopupModal open={page.showModalForm} onClose={page.onCloseModalForm} component={bodyModalForm()} />
      <PageContainer>
        <div className="flex items-center justify-between">
          <PageTitle title="kategory" />
          <Button loading={page.loadingForm} onClick={() => page.setShowModalForm(true)} startIcon={<MdAdd />}>
            Buat Kategory Baru
          </Button>
        </div>
        <div className="grid gap-3 grid-cols-2">
          {page.data.map((item, i) => (
            <Card key={i}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>{item.name}</div>
                  <div className="flex gap-1">
                    <IconButton onClick={() => page.onClickDeleteCategory(item.id)}>
                      <MdDelete color="red" />
                    </IconButton>
                    <IconButton onClick={() => page.onClickEdit(item)}>
                      <MdEdit />
                    </IconButton>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
