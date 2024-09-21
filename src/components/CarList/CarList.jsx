import { useState } from 'react';
import CarItem from '../CarItem/CarItem';
import s from './CarList.module.css';
import CarModal from '../Modal/CarModal';

const CarList = ({ cars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const handleOpenModal = car => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div className={s.carsContainer}>
      <ul className={s.carsList}>
        {cars.map(item => (
          <CarItem
            key={item.id}
            car={item}
            onLearnMoreClick={() => handleOpenModal(item)}
          />
        ))}
      </ul>
      {selectedCar && (
        <CarModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          car={selectedCar}
        />
      )}
    </div>
  );
};

export default CarList;
