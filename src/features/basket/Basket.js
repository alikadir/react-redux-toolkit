import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  basketProductsSelector,
  subtotalSelector,
  remove,
  totalSelector,
  checkStockAndAddBasket,
} from './basketSlice';

const Basket = (props) => {
  const productList = useSelector(basketProductsSelector);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.basket.isLoading);
  const error = useSelector((state) => state.basket.error);
  const subtotal = useSelector(subtotalSelector);
  const total = useSelector(totalSelector);
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const f = new Intl.NumberFormat('tr-TR');

  const handleClickAddProduct = () => {
    const name = nameInputRef.current.value.toString();
    const price = Number(priceInputRef.current.value);

    nameInputRef.current.value = '';
    priceInputRef.current.value = '';

    dispatch(
      checkStockAndAddBasket({
        id: Math.random(),
        name,
        price,
      })
    );
  };

  return (
    <div>
      <h3>Basket</h3>
      <ol>
        {productList.map((i) => (
          <li>
            {i.name} - {f.format(i.price)} TRY <button onClick={() => dispatch(remove(i.id))}>X</button>
          </li>
        ))}
      </ol>
      <p>Sub Total: {f.format(subtotal)} TRY</p>
      <p>Total: {f.format(total)} TRY</p>
      <div>
        <p>{isLoading && 'checking...'}</p>
        <p style={{ color: 'red' }}>{error && error.message}</p>
        <input type="text" ref={nameInputRef} placeholder="name" />
        <input type="number" ref={priceInputRef} placeholder="price" />
        <button onClick={handleClickAddProduct}>+</button>
      </div>
    </div>
  );
};

export default Basket;
