import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import {  useSelector } from 'react-redux';
import {  getCart, getUsername } from './cartSlice';
import EmptyCart from './EmptyCart';


function Cart() {
  const username = useSelector(getUsername)
  const cart = useSelector(getCart)


  if (!cart.length) return <EmptyCart />

  return (
    <div className='py-3 px-4 '>
      <LinkButton
        to="/menu"
      >
        بازگشت به منو  &larr;
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>سبد خرید شما ، {username} جان</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map(item => <CartItem item={item} key={item.pizzaId} />)}
      </ul>
      <div className='mt-6 space-x-2'>
        <span></span>
        <Button  type='primary' to="/order/new">سفارش </Button>

      </div>
    </div>
  );
}

export default Cart;
