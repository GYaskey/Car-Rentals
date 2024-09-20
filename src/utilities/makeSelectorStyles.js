export const makeSelectorStyles = {
  control: provided => ({
    ...provided,
    border: '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #aaa',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: '#aaa',
  }),
};
