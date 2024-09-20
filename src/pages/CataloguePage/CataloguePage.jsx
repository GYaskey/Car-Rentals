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
import { selectFilteredCars } from '../../redux/filters/selectors';
import FilterBox from '../../components/FilterBox/FilterBox';
import { resetFilter } from '../../redux/filters/slice';

const CataloguePage = () => {
  const dispatch = useDispatch();
  const showLoadMore = useSelector(selectShowLoadMore);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const cars = useSelector(selectCars);
  const filteredCars = useSelector(selectFilteredCars);

  useEffect(() => {
    dispatch(resetFilter());
    if (cars.length === 0) {
      dispatch(getCarsThunk(page));
    }
  }, [dispatch, page, cars.length]);

  const displayedCars = filteredCars.length > 0 ? filteredCars : cars;

  return (
    <div className={s.catalogue}>
      <h2 className={s.catalogueHeadline}>Catalogue</h2>
      <FilterBox />
      <CarList cars={displayedCars} />
      {showLoadMore && filteredCars.length === 0 && <LoadMoreBtn />}
      {isLoading && <Loader />}
    </div>
  );
};

export default CataloguePage;
