import CarItem from '../CarItem/CarItem';
import s from './CarList.module.css';

const CarList = ({ cars }) => {
  return (
    <div className={s.carsContainer}>
      <ul className={s.carsList}>
        {cars.map(item => (
          <CarItem key={item.id} car={item} />
        ))}
      </ul>
    </div>
  );
};

export default CarList;
