import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorites/selectors';
import CarList from '../../components/CarList/CarList';
import s from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={s.catalogue}>
      <h2 className={s.catalogueHeadline}>Favorites</h2>
      {favorites.length === 0 && (
        <p>You didn`t add any cars to favorites yet!</p>
      )}
      <CarList cars={favorites} />
    </div>
  );
};

export default FavoritesPage;
