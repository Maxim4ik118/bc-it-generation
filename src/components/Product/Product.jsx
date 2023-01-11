import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeProduct } from 'redux/products/productsSlice';

// import s from './Product.module.scss';
import { StyledProduct, StyledProductBtn } from './Styled';

export const Product = ({ image, price, discount = {}, title, id }) => {
  const dispatch = useDispatch();

  const remove = (productId) => {
    ///
    dispatch(removeProduct(productId));
    console.log(productId);
  }

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
        <StyledProductBtn type="button" onClick={() => remove(id)}> 
          <span>Delete</span>
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
