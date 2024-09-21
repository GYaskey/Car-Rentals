import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import s from './CarModal.module.css';

Modal.setAppElement('#root');

const CarModal = ({ isOpen, onRequestClose, car }) => {
  if (!car) return null;

  const accessoriesAndFunc = [...car.accessories, ...car.functionalities];
  const rentalConditionsArray = car.rentalConditions.split('\n');
  const [minAgeCondition, ...otherConditions] = rentalConditionsArray;
  const [minAgeLabel, minAgeValue] = minAgeCondition.split(': ');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={s.modalContent}
      overlayClassName={s.modalOverlay}
    >
      <button className={s.closeBtn} onClick={onRequestClose}>
        <IoClose />
      </button>

      <div className={s.imgTitleDescWrapper}>
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className={s.carImage}
        />
        <div className={s.titleTagsBox}>
          <h2 className={s.carTitle}>
            {`${car.make}`}{' '}
            <span className={s.titleHighlight}>{car.model}</span>,{' '}
            {`${car.year}`}
          </h2>
          <p className={s.carTags}>
            <span>{car.address.split(', ')[1]}</span>
            <span>{car.address.split(', ')[2]}</span>
            <span>Id: {car.id}</span>
            <span>Year: {car.year}</span>
            <span>Type: {car.type}</span>
            <span>Fuel Consumption: {car.fuelConsumption}</span>
            <span>Engine Size: {car.engineSize}</span>
          </p>
        </div>
        <p className={s.description}>{car.description}</p>
      </div>

      <div className={s.accessoriesAndFuncWrapper}>
        <h3 className={s.accessoriesAndFuncTitle}>
          Accessories and functionalities:
        </h3>
        <ul className={s.accessoriesAndFuncList}>
          {accessoriesAndFunc.map(func => (
            <li key={func} className={s.accessoriesAndFunc}>
              {func}
            </li>
          ))}
        </ul>
      </div>

      <div className={s.rentCondWrapper}>
        <h3 className={s.rentCondTitle}>Rental Conditions:</h3>
        <ul className={s.rentalCondList}>
          <li className={s.rentalCond}>
            {minAgeLabel}:&nbsp;
            <span className={s.rentalCondHighlight}> {minAgeValue}</span>
          </li>
          {otherConditions.map(condition => (
            <li key={condition} className={s.rentalCond}>
              {condition}
            </li>
          ))}
          <li className={s.rentalCond}>
            Mileage:&nbsp;{' '}
            <span className={s.rentalCondHighlight}>{car.mileage}</span>
          </li>
          <li className={s.rentalCond}>
            Price:&nbsp;
            <span className={s.rentalCondHighlight}>{car.rentalPrice}</span>
          </li>
        </ul>
      </div>
      <a href="tel:+380730000000" className={s.rentCarLink}>
        Rent car
      </a>
    </Modal>
  );
};

export default CarModal;
