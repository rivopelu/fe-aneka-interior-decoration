import { FormikProvider } from "formik"
import { Card, CardBody } from "../../../components/Card"
import Divider from "../../../components/Divider"
import Grid from "../../../components/Grid"
import InputSelect from "../../../components/InputSelect"
import InputText from "../../../components/InputText"
import InputTextArea from "../../../components/InputTextarea"
import PageContainer from "../../../components/PageContainer"
import UploadBoxCropperArea from "../../../components/UploadBoxCropper"
import { useNewProductPage } from "./useNewProductPage"
import InputRupiah from "../../../components/InputRupiah"
import Button from "../../../components/Button"

export default function NewProductPage() {
  const page = useNewProductPage()

  return (
    <div>
      <PageContainer>
        <div>
          <h1 className="text-3xl">Buat produk baru</h1>
        </div>
        <Card>
          <CardBody>
            <div>Silahkan masukan informasi produk yang ingin dibuat</div>
          </CardBody>
          <Divider />
          <FormikProvider value={page.formik}>
            <CardBody>
              <Grid gap="lg">
                <UploadBoxCropperArea label="Foto Produk" required onChange={(e) => page.formik.setFieldValue('image_url', e)} value={page.formik.values.image_url} folderName="product" />
                <InputText name="name" id="name" label="Nama produk" placeholder="Masukan nama produk" required />
                <InputTextArea name="description" id="description" label="Descripsi produk" placeholder="Masukan deskripsi produk" required />
                <InputRupiah name="price" id="price" label="Harga" placeholder="Masukan Harga" />
                <InputSelect label="category" placeholder="Pilih kategory" options={page.listCategory} name="category_id" />
                <Button loading={page.loadingSubmit} onClick={() => page.formik.handleSubmit()}>Buat</Button>
              </Grid>
            </CardBody>
          </FormikProvider>
        </Card>
      </PageContainer>
    </div>
  )
}