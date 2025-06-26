import { ProductAction } from '../redux/actions/product.action.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery.ts';
import { twMerge } from 'tailwind-merge';
import Dropdown from './Dropdown.tsx';
import Button from './Button.tsx';
import { ListGroup, ListItem, ListItemNested } from './List.tsx';
import { MdArrowDownward, MdCategory, MdSubdirectoryArrowRight } from 'react-icons/md';
import { IResMasterData } from '../types/response/IResMasterData.ts';

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
        const mockSubCategories: IResMasterData[] = [];
        const categoryName = category.name.toLowerCase();

        if (categoryName.includes('furniture') || categoryName.includes('mebel') || categoryName.includes('furnitur')) {
          mockSubCategories.push(
            { id: `${category.id}_sofa`, name: 'Sofa & Kursi Santai', slug: 'sofa' },
            { id: `${category.id}_chair`, name: 'Kursi & Bangku', slug: 'chair' },
            { id: `${category.id}_table`, name: 'Meja & Rak', slug: 'table' },
            { id: `${category.id}_bed`, name: 'Tempat Tidur', slug: 'bed' },
            { id: `${category.id}_storage`, name: 'Lemari & Penyimpanan', slug: 'storage' },
          );
        } else if (
          categoryName.includes('decoration') ||
          categoryName.includes('dekorasi') ||
          categoryName.includes('hiasan')
        ) {
          mockSubCategories.push(
            { id: `${category.id}_wall`, name: 'Hiasan Dinding', slug: 'wall-decoration' },
            { id: `${category.id}_plant`, name: 'Tanaman Hias', slug: 'plants' },
            { id: `${category.id}_vase`, name: 'Vas & Pot', slug: 'vase-pot' },
            { id: `${category.id}_frame`, name: 'Bingkai & Foto', slug: 'frame' },
            { id: `${category.id}_candle`, name: 'Lilin & Aromaterapi', slug: 'candle' },
          );
        } else if (
          categoryName.includes('lighting') ||
          categoryName.includes('lampu') ||
          categoryName.includes('pencahayaan')
        ) {
          mockSubCategories.push(
            { id: `${category.id}_ceiling`, name: 'Lampu Gantung', slug: 'ceiling-light' },
            { id: `${category.id}_table_lamp`, name: 'Lampu Meja', slug: 'table-lamp' },
            { id: `${category.id}_floor`, name: 'Lampu Lantai', slug: 'floor-lamp' },
            { id: `${category.id}_wall_lamp`, name: 'Lampu Dinding', slug: 'wall-lamp' },
            { id: `${category.id}_outdoor`, name: 'Lampu Outdoor', slug: 'outdoor-lamp' },
          );
        } else if (
          categoryName.includes('textile') ||
          categoryName.includes('tekstil') ||
          categoryName.includes('kain')
        ) {
          mockSubCategories.push(
            { id: `${category.id}_curtain`, name: 'Gorden & Tirai', slug: 'curtain' },
            { id: `${category.id}_pillow`, name: 'Bantal & Cushion', slug: 'pillow' },
            { id: `${category.id}_carpet`, name: 'Karpet & Permadani', slug: 'carpet' },
            { id: `${category.id}_bedsheet`, name: 'Sprei & Bed Cover', slug: 'bedsheet' },
          );
        } else if (
          categoryName.includes('kitchen') ||
          categoryName.includes('dapur') ||
          categoryName.includes('peralatan')
        ) {
          mockSubCategories.push(
            { id: `${category.id}_cookware`, name: 'Peralatan Masak', slug: 'cookware' },
            { id: `${category.id}_tableware`, name: 'Peralatan Makan', slug: 'tableware' },
            { id: `${category.id}_storage_kitchen`, name: 'Penyimpanan Dapur', slug: 'storage-kitchen' },
            { id: `${category.id}_appliance`, name: 'Peralatan Listrik', slug: 'appliance' },
          );
        } else {
          // For any other category, add some generic sub-categories to demonstrate hover functionality
          mockSubCategories.push(
            { id: `${category.id}_premium`, name: 'Premium Collection', slug: 'premium' },
            { id: `${category.id}_budget`, name: 'Budget Friendly', slug: 'budget' },
            { id: `${category.id}_new`, name: 'Koleksi Terbaru', slug: 'new' },
          );
        }

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
      // If same category is clicked, clear all filters
      navigate({ search: '', pathname: '/' });
    } else {
      // Navigate to category, clear sub-category
      navigate({ pathname: '', search: `?category_id=${id}` });
    }
  };

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    // Navigate with both category and sub-category
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
