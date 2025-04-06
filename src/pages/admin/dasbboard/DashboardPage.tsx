import { HttpService } from '../../../services/http.service.ts';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../../constants/endpoint.ts';
import { BaseResponse } from '../../../types/response/IResModel.ts';
import { IResOrderReport } from '../../../types/response/IResOrderReport.ts';
import ErrorService from '../../../services/error.service.ts';
import CardLoading from '../../../components/CardLoading.tsx';
import { Card, CardBody } from '../../../components/Card.tsx';
import PageContainer from '../../../components/PageContainer.tsx';
import { PageTitle } from '../../../components/PageTItle.tsx';
import { NumberFormatterHelper } from '../../../helper/number-format-helper.ts';

export default function DashboardPage() {
  const httpService = new HttpService();
  const errorService = new ErrorService();

  const [reportData, setReportData] = useState<IResOrderReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpService
      .GET(ENDPOINT.ORDER_REPORT())
      .then((res: BaseResponse<IResOrderReport[]>) => {
        setReportData(res.data.response_data);
        setLoading(false);
      })
      .catch((e) => {
        errorService.fetchApiError(e);
        setLoading(false);
      });
  }, []);

  const numberFormat = new NumberFormatterHelper();
  function checkValue(label: string, value: number) {
    if (label === 'Total Pemasukan') {
      return numberFormat.toRupiah(value);
    } else {
      return value;
    }
  }
  return (
    <PageContainer>
      <PageTitle title={'Dashboard Penjualan'} />
      {loading && <CardLoading />}
      <div className={'grid grid-cols-2 gap-4'}>
        {reportData.map((report, i) => {
          return (
            <Card key={i}>
              <CardBody>
                <div className={'flex items-center justify-between'}>
                  <div>
                    <h1 className={'text-2xl'}>{report.name}</h1>
                    <p className={' text-gray-400'}>{report.description}</p>
                  </div>
                  <div className={'text-3xl font-semibold text-primary-main'}>
                    {checkValue(report.name, report.value)}
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
