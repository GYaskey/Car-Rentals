import { useDispatch, useSelector } from 'react-redux';
import CarList from '../../components/CarList/CarList';
import {
  selectCars,
  selectIsLoading,
  selectPage,
  selectShowLoadMore,
} from '../../redux/cars/selectors';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';
import s from './CataloguePage.module.css';
import { useEffect } from 'react';
import { getCarsThunk } from '../../redux/cars/operations';

const CataloguePage = () => {
  const showLoadMore = useSelector(selectShowLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getCarsThunk(page));
    }
  }, [dispatch, page, cars.length]);

  return (
    <div className={s.catalogue}>
      <h2 className={s.catalogueHeadline}>Catalogue</h2>
      <CarList cars={cars} />
      {showLoadMore && <LoadMoreBtn />}
      {isLoading && <Loader />}
    </div>
  );
};

export default CataloguePage;
