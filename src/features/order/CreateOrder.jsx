import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../utils/store'
import { convertEnNumberToPersian } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';


const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status, position, address, error: errorAddress } = useSelector(state => state.user)
  const isLoading = status === 'loading'

  const dispatch = useDispatch();
  const cart = useSelector(getCart)
  const navigation = useNavigation();
  const isSubmit = navigation.state === 'submitting';
  const formErrors = useActionData();
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = Math.round(totalCartPrice + priorityPrice)




  if (!cart.length) return <EmptyCart />

  return (
    <div className='py-6 px-4 '>
      <h2 className='text-xl font-semibold mb-8 '>آماده ای برای سفارش؟ بزن بریم!</h2>

      <Form method="POST">
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center '>
          <label className='sm:basis-40'>اسمتون</label>
          <input defaultValue={username} className="input grow" type="text" name="customer" required />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>شماره تماس</label>
          <div className='grow'>
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className='rounded-md w-36 text-xs mt-2 text-red-700 bg-red-100' >{formErrors.phone}</p>}
          </div>

        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative'>
          <label className='sm:basis-40'>آدرس</label>

          <input defaultValue={address} disabled={isLoading} className="input grow" type="text" name="address" required />
          {!position.latitude && !position.longitude && <span className='absolute sm:left-[3px] sm:top-[3px] z-50 left-[3px] top-[35px]' >
            <Button disabled={isLoading} type='small' onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress())
            }}>موقعیت الانت</Button></span>}

        </div>
        {status === 'error' && <p className='rounded-md mb-2  text-xs mt-2 text-red-700 bg-red-100' >{errorAddress}</p>}
        <div className='mb-12 flex gap-5 items-center'>
          <input
            className="h-6 w-6 accent-yellow-400  focus:outline-none focus:ring 
            focus:ring-yellow-400
            focus:ring-offset-1
            "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className='font-medium'>سفارشم را در اولویت قرار دهید</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ?
            `${position.latitude},${position.longitude}` : ''} />
          <Button disabled={isSubmit || isLoading} type='primary'>
            {isSubmit ? 'در حال سفارش... ' : `سفارش  (${convertEnNumberToPersian(totalPrice)} هزار تومان )`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const errors = {};
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  };
  if (!isValidPhone(data.phone)) errors.phone = 'شماره وارد شده اشتباه است.';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
