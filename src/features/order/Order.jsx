// Test ID: IIDSAT
import {
  calcMinutesLeft,
  convertEnNumberToPersian,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import { useFetcher, useLoaderData } from 'react-router-dom';
import OrderItem from './OrderItem'
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';


function Order() {
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(function () {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')

  }, [fetcher])

  return (
    <div className='py-6 px-4 space-y-8'>
      <div className='flex items-center justify-between 
      flex-wrap gap-2
      '>
        <h2 className='text-xl font-semibold'>شماره سفارش {id}</h2>

        <div className='space-x-1'>
          <span></span>
          {priority && <span className='bg-red-500 text-red-50 tracking-wide rounded-full py-1 px-4 text-sm inline-block font-semibold ' >اولویت</span>}
          <span className='bg-green-500 text-green-50 tracking-wide rounded-full py-1 px-4 text-sm inline-block'>{status === 'preparing' ? "آماده سازی " : ""}سفارش</span>
        </div>
      </div>

      <div className='flex items-center justify-between 
      flex-wrap gap-2 bg-stone-200 py-5 px-6
      ' >
        <p className='font-medium'>
          {deliveryIn >= 0
            ? ` ${calcMinutesLeft(estimatedDelivery)} دقیقه  تا تحویل`
            : 'سفارش باید رسیده باشد'}
        </p>
        <p className='text-xs text-stone-500'>(تحویل احتمالی: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className='divide-y divide-stone-200 border-b border-t'>
        {cart.map(item => <OrderItem item={item} key={item.pizzaId}
          ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []}
          isLoadingIngredients={fetcher.state === 'loading'}
        />)}
      </ul>
      <div className='space-y-2 bg-stone-200 py-5 px-6'>
        <p className='text-sm text-stone-600'> قیمت پیتزا: {convertEnNumberToPersian(orderPrice)}هزار تومان</p>
        {priority && <p className='text-sm text-stone-600'> اولویت قیمت: {convertEnNumberToPersian(priorityPrice)} هزار تومان</p>}
        <p className='font-bold'>پرداخت در هنگام تحویل: {convertEnNumberToPersian(orderPrice + priorityPrice)} هزار تومان</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
