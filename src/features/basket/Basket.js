import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { basketProductsSelector, subtotalSelector, remove, add } from './basketSlice';

const Basket = (props) => {
  const productList = useSelector(basketProductsSelector);
  const dispatch = useDispatch();
  const subtotal = useSelector(subtotalSelector);
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const f = new Intl.NumberFormat('tr-TR');

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
      <p>Total: {f.format(subtotal)} TRY</p>
      <div>
        <input type="text" ref={nameInputRef} placeholder="name" />
        <input type="number" ref={priceInputRef} placeholder="price" />
        <button
          onClick={() => {
            dispatch(
              add({
                id: Math.random(),
                name: nameInputRef.current.value.toString(),
                price: Number(priceInputRef.current.value),
              })
            );

            nameInputRef.current.value = '';
            priceInputRef.current.value = '';
          }}>
          +
        </button>
      </div>
    </div>
  );
};

export default Basket;
