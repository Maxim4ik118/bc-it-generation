import cn from 'classnames';
import PropTypes from 'prop-types';

import { StyledAlert } from './Styled';

export const Alert = ({ outlined = false, className = "", children }) => {
  return (
    <StyledAlert
      className={cn(className, {
        'outlined': outlined === true, // true || false
      })}
    >
      {children}
    </StyledAlert>
  );
};

// <p className={`${css.alert} ${className} ${outlined ? css.outlined : ''}`}>

Alert.propTypes = {
  outlined: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
