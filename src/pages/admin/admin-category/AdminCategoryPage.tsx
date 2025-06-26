import { MdAdd, MdDelete, MdEdit, MdCategory } from 'react-icons/md';
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
import InputSelect from '../../../components/InputSelect';

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
          <Button color="error" onClick={page.onCloseModalForm}>
            BATAL
          </Button>
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

  function bodyModalSubCategoryForm() {
    return (
      <Card>
        <CardBody>
          <div className="flex items-center gap-2">
            <MdCategory className="w-5 h-5" />
            <span>Buat Sub-Category Baru</span>
          </div>
        </CardBody>
        <Divider />
        <CardBody className="min-w-sm space-y-4">
          <FormikProvider value={page.subCategoryFormik}>
            <InputSelect
              required
              name="category_id"
              label="Pilih Category Utama"
              placeholder="Pilih category..."
              options={page.categoryOptions}
            />
            <InputText
              required
              id="name"
              name="name"
              label="Nama Sub-Category"
              placeholder="Masukan nama sub-category"
            />
          </FormikProvider>
        </CardBody>
        <Divider />
        <CardBody className="grid grid-cols-2 gap-2">
          <Button color="error" onClick={page.onCloseSubCategoryModal}>
            BATAL
          </Button>
          <Button
            loading={page.loadingSubCategoryForm}
            onClick={() => page.subCategoryFormik.handleSubmit()}
            disable={!page.subCategoryFormik.values.name || !page.subCategoryFormik.values.category_id}
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
      <PopupModal
        open={page.showSubCategoryModal}
        onClose={page.onCloseSubCategoryModal}
        component={bodyModalSubCategoryForm()}
      />
      <PageContainer>
        <div className="flex items-center justify-between">
          <PageTitle title="Kategori" />
          <div className="flex gap-2">
            <Button
              loading={page.loadingForm}
              onClick={() => page.setShowModalForm(true)}
              startIcon={<MdAdd />}
              variant="outlined"
            >
              Buat Kategori Baru
            </Button>
            <Button
              loading={page.loadingSubCategoryForm}
              onClick={() => page.setShowSubCategoryModal(true)}
              startIcon={<MdCategory />}
            >
              Buat Sub-Kategori
            </Button>
          </div>
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
