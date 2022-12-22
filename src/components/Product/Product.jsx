import PropTypes from 'prop-types';

// import s from './Product.module.scss';
import { StyledProduct, StyledProductBtn } from './Styled';

export const Product = ({ image, price, discount = {}, title }) => {
  // const { image, price, discount = {}, title } = props;
  const hasDiscount = discount.hasOwnProperty('value');
  return (
    <StyledProduct discount={hasDiscount}>
      <img className="productImg" src={image} alt={title} width="440" />
      <div className="productBody">
        <h2 className="productTitle">{title}</h2>
        <p className="productPrice">
          Price: {price}$
          <span className="productDiscount">DISCOUNT -{discount.value}%</span>
        </p>
        <StyledProductBtn type="button">
          <span>Buy now</span>
        </StyledProductBtn>
      </div>
    </StyledProduct>
  );
};

Product.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  discount: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }),
};
