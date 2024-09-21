import { InfinitySpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <InfinitySpin
        visible={true}
        color="rgba(52, 112, 255, 0.8)"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
