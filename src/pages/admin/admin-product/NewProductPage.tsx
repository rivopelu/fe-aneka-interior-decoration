import { Card, CardBody } from "../../../components/Card"
import Divider from "../../../components/Divider"
import Grid from "../../../components/Grid"
import InputText from "../../../components/InputText"
import InputTextArea from "../../../components/InputTextarea"
import PageContainer from "../../../components/PageContainer"
import UploadBoxCropperArea from "../../../components/UploadBoxCropper"

export default function NewProductPage() {
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
          <CardBody>
            <Grid gap="lg">
              <UploadBoxCropperArea label="Foto Produk" required  onChange={(e) => console.log(e)} folderName="product" />
              <InputText name="name" id="name" label="Nama produk" placeholder="Masukan nama produk" required />
              <InputTextArea name="description" id="description" label="Descripsi produk" placeholder="Masukan deskripsi produk" required />
            </Grid>
          </CardBody>
        </Card>
      </PageContainer>
    </div>
  )
}