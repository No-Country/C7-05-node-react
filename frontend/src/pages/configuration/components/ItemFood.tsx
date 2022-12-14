import EditIcon from '@/components/svg/EditIcon';
import { useState } from 'react';
import styles from '../styles/itemFood.module.css';
import TrashIcon from '@/components/svg/TrashIcon';
import { Food } from '@/models/foods.type';
import { foodDeleteService } from '../services/foods';
import { useAppDispatch } from '@/redux/hooks';
import { removeFood } from '@/redux/slices/foodsSlice';

interface IProps {
  foodData: Food;
  handleClickUpdate: (food: Food) => void;
}

export default function ItemFood({ foodData, handleClickUpdate }: IProps) {
  const [isHovered, setIsHovered] = useState({ edit: false, delete: false });
  const dispatch = useAppDispatch();
  const { optionName, estimatedTime } = foodData;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered({ ...isHovered, [e.currentTarget.id]: true });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setIsHovered({ ...isHovered, [e.currentTarget.id]: false });
  };

  const handleClickDelete = async () => {
    const response = await foodDeleteService(foodData.foodId);

    if (response) dispatch(removeFood(foodData));
  };

  return (
    <div className={styles.itemFoodContainer}>
      <span>{optionName}</span>
      <span>
        <strong>tiempo:</strong> {estimatedTime} min
      </span>
      <section className={styles.iconsContainer}>
        <div
          onClick={() => handleClickUpdate(foodData)}
          id='edit'
          title='Editar'
          className={styles.iconContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <EditIcon stroke={isHovered.edit ? 'blue' : ''} svgProp={{ width: 30, height: 25 }} />
        </div>
        <div
          onClick={handleClickDelete}
          id='delete'
          title='Eliminar'
          className={styles.iconContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <TrashIcon stroke={isHovered.delete ? 'red' : ''} svgProp={{ width: 30, height: 25 }} />
        </div>
      </section>
    </div>
  );
}
