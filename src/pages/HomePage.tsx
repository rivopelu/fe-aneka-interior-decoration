import Button from "../components/Button";
import Grid from "../components/Grid";
import PageContainer from "../components/PageContainer";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import { useHomePage } from "./useHomePage";

export default function HomePage() {
  const page = useHomePage()
  return (
    <div className="py-8">
      <PageContainer>
        <Grid grid={5} gap="sm">
          {
            page.listData.map((item, i) => (
              <ProductCard key={i} data={item} />
            ))
          }
        </Grid>
        {
          page.loading &&
          <div className="mt-8">

            <Grid grid={5} gap="sm">
              {
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton className="w-full h-80 rounded-md" key={i} />
                ))
              }
            </Grid>
          </div>

        }
        <div className="flex items-center mt-10 justify-center w-full"><Button onClick={page.loadMore} className="px-12" variant="text">Lainnya</Button></div>

      </PageContainer>
    </div>
  );
}
