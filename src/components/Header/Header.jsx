import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => {
  const addActive = ({ isActive }) => (isActive ? s.active : s.link);

  return (
    <div className={s.header}>
      <NavLink to="/" className={addActive}>
        Home
      </NavLink>
      <NavLink to="/catalogue" className={addActive}>
        Catalogue
      </NavLink>
      <NavLink to="/favorites" className={addActive}>
        Favorites
      </NavLink>
    </div>
  );
};

export default Header;
