import { BsHeart, BsHeartFill } from 'react-icons/bs';

import s from './CarItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorites/selectors';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/slice';

const CarItem = ({ car, onLearnMoreClick }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some(item => item.id === car.id);

  const handleLike = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ id: car.id }));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  return (
    <li className={s.carCard}>
      <div className={s.carContent}>
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className={s.carImg}
        />
        <div className={s.carTextBox}>
          <div className={s.carHeadline}>
            <p>
              {car.make} <span className={s.carModelSpan}>{car.model}</span>{' '}
              {car.year}
            </p>
            <p>{car.rentalPrice}</p>
          </div>
          <p className={s.carTags}>
            <span>{car.address.split(', ')[1]}</span>
            <span>{car.address.split(', ')[2]}</span>
            <span>{car.rentalCompany}</span>
            <span>{car.type}</span>
            <span>{car.make}</span>
            <span>{car.id}</span>
            <span>{car.functionalities[0]}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className={s.learnMoreBtn}
        onClick={() => onLearnMoreClick(car)}
      >
        Learn more
      </button>
      <button type="button" className={s.favoriteBtn} onClick={handleLike}>
        {isFavorite ? (
          <BsHeartFill size="18px" color="#3470FF" />
        ) : (
          <BsHeart size="18px" color="#fff" />
        )}
      </button>
    </li>
  );
};

export default CarItem;
