import PropTypes from 'prop-types';

export const Button = ({ type, children, ...restProps }) => {
  return (
    <button type={type} {...restProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
