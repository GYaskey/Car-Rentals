# Car Rental

## Description

This project is a web application for car rental that allows users to browse,
filter, and rent cars. The application provides an intuitive interface for
finding cars that meet user needs.

## Implementation

The application is built as a single-page application (SPA) using React. All
interactions with the backend are organized through Redux, allowing for state
management and asynchronous requests to MockAPI.

## Technologies

- **React**: A library for building user interfaces.
- **Redux**: A state manager for managing data.
- **Axios**: A library for making HTTP requests to the backend.
- **React Router**: For routing within the application.
- **Formik**: For form management and validation.
- **React Select**: A component for creating styled select inputs.
- **React Modal**: For creating modal windows.
- **react-loader-spinner**: For displaying loading indicators.
- **react-icons**: For using icons in the project.

## Functionality

### Home Page

- General information about the company and buttons to navigate to the catalog
  and the "Favorites" page.

### Car Catalog

- **Car Viewing**: Users can browse a list of cars with features such as make,
  model, year of manufacture, price, and additional information displayed in
  tags.
- **Car Filtering**: Users can filter cars based on various criteria:
  - **Make**: Enter the make name or select it from a dropdown list for a quick
    search.
  - **Price**: Users can filter cars based on the maximum rental price per hour.
  - **Mileage**: Users can set a mileage range for displaying cars.

### Favorites

- Users can save cars to favorites for quick access, making it easier to
  revisit.

### Modal Window

- When clicking the "Learn more" button, a modal window opens with detailed
  information that includes:
  - Description of the car.
  - Features such as year of manufacture, mileage, engine size, fuel
    consumption, etc.
  - A list of accessories and functionalities.
  - Rental conditions, including the minimum age of the renter.
  - A button for contacting the company via phone to rent the car.
