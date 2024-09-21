import { useDispatch, useSelector } from 'react-redux';
import { addPage } from '../../redux/cars/slice';
import { getCarsThunk } from '../../redux/cars/operations';
import { selectPage } from '../../redux/cars/selectors';
import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  const handleLoadMore = () => {
    dispatch(addPage());
    dispatch(getCarsThunk(page + 1));
  };

  return (
    <button type="button" onClick={handleLoadMore} className={s.loadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
