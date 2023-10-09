import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { convertEnNumberToPersian } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice=useSelector(getTotalCartPrice)


  if(!totalCartPrice) return null
  return (
    <div
      className="flex
     items-center justify-between bg-stone-800 p-4 text-stone-200 sm:px-6"
    >
      <p
        className="space-x-2
       text-sm font-semibold text-stone-300
       sm:space-x-4 md:text-base
       "
      >
        <span></span>
        <span>{totalCartQuantity} تا پیتزا</span>
        <span>{convertEnNumberToPersian(totalCartPrice)} هزار تومان</span>
      </p>
      <Link to="/cart">سبد خرید &#x1F6D2;</Link>
    </div>
  );
}

export default CartOverview;
