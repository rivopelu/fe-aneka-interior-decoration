import { useEffect, useState } from 'react';
import { MdArrowDownward, MdCategory, MdSubdirectoryArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery.ts';
import { ProductAction } from '../redux/actions/product.action.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { IResMasterData } from '../types/response/IResMasterData.ts';
import Button from './Button.tsx';
import Dropdown from './Dropdown.tsx';
import { ListGroup, ListItem, ListItemNested } from './List.tsx';

export default function GlobalCategory() {
  const productAction = new ProductAction();
  const dispatch = useAppDispatch();
  const Product = useAppSelector((state) => state.Product);
  const listData = Product?.listCategory?.data || [];
  const query = useQuery();
  const navigate = useNavigate();

  // State for enhanced categories with sub-categories
  const [enhancedCategories, setEnhancedCategories] = useState<IResMasterData[]>([]);

  const categoryId = query.get('category_id');
  const subCategoryId = query.get('sub_category_id');

  useEffect(() => {
    dispatch(productAction.listCategory());
  }, []);

  // Mock sub-categories data - In real implementation, this would come from API
  useEffect(() => {
    if (listData.length > 0) {
      const enhanced: IResMasterData[] = listData.map((category) => {
        return {
          ...category,
          sub_category: category.sub_category ? [...category.sub_category] : [],
        };
      });

      setEnhancedCategories(enhanced);
    }
  }, [listData]);

  const handleCategoryClick = (id: string) => {
    const currentCategoryId = query.get('category_id');

    if (currentCategoryId === id) {
      navigate({ search: '', pathname: '/' });
    } else {
      navigate({ pathname: '', search: `?category_id=${id}` });
    }
  };

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    navigate({
      pathname: '',
      search: `?category_id=${categoryId}&sub_category_id=${subCategoryId}`,
    });
  };

  const renderCategoryItem = (category: IResMasterData) => {
    const isActive = categoryId === category.id;
    const hasSubCategories = category.sub_category && category.sub_category.length > 0;

    if (hasSubCategories) {
      return (
        <ListItemNested
          key={category.id}
          label={category.name}
          icon={<MdCategory className="w-4 h-4" />}
          active={isActive}
          onClick={() => handleCategoryClick(category.id)}
          nestedItems={category.sub_category?.map((subCat) => ({
            label: subCat.name,
            icon: <MdSubdirectoryArrowRight className="w-3 h-3" />,
            onClick: () => {
              console.log(`Clicked sub-category: ${subCat.name}`);
              handleSubCategoryClick(category.id, subCat.id);
            },
          }))}
          className="min-w-xs"
        />
      );
    } else {
      // Render as regular item
      return (
        <ListItem
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="min-w-xs"
          label={category.name}
          icon={<MdCategory className="w-4 h-4" />}
          active={isActive}
        />
      );
    }
  };

  return (
    <Dropdown
      toggle={
        <Button variant="outlined" color="white" endIcon={<MdArrowDownward />}>
          Kategori
        </Button>
      }
    >
      <ListGroup>{enhancedCategories.map(renderCategoryItem)}</ListGroup>
    </Dropdown>
  );
}
