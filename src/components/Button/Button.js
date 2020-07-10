import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="Button" type="button">
      Next
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
// import './button.css';

// const Button = () => {
//   return window.scrollTo({
//     top: document.documentElement.scrollHeight,
//     behavior: 'smooth',
//   });
// };

// export default Button;
