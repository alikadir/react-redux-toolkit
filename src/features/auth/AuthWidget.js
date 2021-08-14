import { useDispatch, useSelector } from 'react-redux';
import { authCurrentUserSelector, changeExtraDiscountPercent } from './authSlice';

const AuthWidget = (props) => {
  const currentUser = useSelector(authCurrentUserSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>AuthWidget</h3>
      <label>
        Extra discount
        <input
          style={{ fontSize: 40, width: 70 }}
          type="number"
          onChange={(e) => {
            dispatch(changeExtraDiscountPercent(Number(e.target.value)));
          }}
          defaultValue={currentUser.extraDiscountPercent}
        />
      </label>
    </div>
  );
};

export default AuthWidget;
