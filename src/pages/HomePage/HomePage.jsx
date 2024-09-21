import { NavLink } from 'react-router-dom';
import s from './HomePage.module.css';
import image from '../../img/pexels-hamann-la-338986-1131575.jpg';

const HomePage = () => {
  return (
    <div className={s.homePage}>
      <div className={s.headlineBox}>
        <h1 className={s.headline}>
          Drive Your Dream: The Ultimate Car Rental Experience
        </h1>
        <span className={s.slogan}>Explore More, Worry Less</span>
      </div>
      <div className={s.descriptionBox}>
        <img
          src={image}
          alt="Two people next to car"
          height="600px"
          width="800px"
          className={s.descriptionImg}
        />
        <p className={s.descriptionText}>
          <span className={s.descriptionTextSpan}>
            Discover the freedom to explore with our easy-to-use car rental
            service.
          </span>
          <span className={s.descriptionTextSpan}>
            Whether you`re planning a weekend getaway or a cross-country
            adventure, we offer a diverse fleet of well-maintained vehicles at
            unbeatable prices.
          </span>
          <span className={s.descriptionTextSpan}>
            Enjoy seamless booking, flexible options, and exceptional customer
            service tailored to make your journey unforgettable.
          </span>
          <span className={s.homeNav}>
            <NavLink to="/catalogue" className={s.bodyLink}>
              Catalogue
            </NavLink>
            <NavLink to="/favorites" className={s.bodyLink}>
              Favorites
            </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
