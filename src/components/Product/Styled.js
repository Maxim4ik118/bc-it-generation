import { Button } from 'components/Button/Button';
import styled from 'styled-components';

export const StyledProduct = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  margin: 0 auto 25px;
  border: 1px solid rgb(5, 5, 5);

  .productImg {
    max-width: 450px;
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }
  .productBody {
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  .productTitle {
    margin-bottom: 22px;
    font-size: 26px;
  }
  .productPrice {
    font-size: 22px;
  }
  .productDiscount {
    display: ${({discount}) => discount ? "inline-block" : "none"};
    font-weight: bold;
    color: white;
    background-color: black;
    padding: 5px 10px;
    margin-left: 12px;
  }
`;

export const StyledProductBtn = styled(Button)`
  padding: 15px;
  background-color: rgb(254, 110, 66);
  color: black;
  font-size: 17px;
  border-radius: 6px;
  border: none;
`;
