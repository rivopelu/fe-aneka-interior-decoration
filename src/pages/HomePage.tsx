import Grid from "../components/Grid";
import PageContainer from "../components/PageContainer";
import ProductCard from "../components/ProductCard";
import { useHomePage } from "./useHomePage";

export default function HomePage() {
  const page = useHomePage()
  return (
    <div className="mt-8">
      <PageContainer>
        <Grid grid={5} gap="sm">
          {
            page.listData.map((item, i) => (
              <ProductCard key={i} data={item} />
            ))
          }
        </Grid>
      </PageContainer>
    </div>
  );
}
