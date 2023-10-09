import { useState } from 'react';
import { convertEnNumberToPersian } from '../../utils/helpers';
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux';


import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {

  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currenQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currenQuantity > 0;
  const [show, setShow] = useState(false)
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }
    dispatch(addItem(newItem))
  }
  return (
    <li className='flex gap-4 py-2'>
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} />
      <div className='flex flex-col grow pt-0.5'>
        <p className='font-medium space-x-2 tracking-wide'><span></span><span>پیتزا</span><span>{name}</span></p>
        <p className='text-sm text-stone-500 mt-1'><span className='cursor-pointer' onClick={() => setShow(s => !s)}>ترکیبات پیتزا</span> <p className={`transition-all duration-500 ${show ? "opacity-70" : "opacity-0"}`}>{ingredients.join(', ')}</p></p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? <p className='text-sm'>{convertEnNumberToPersian(unitPrice)} هزار تومان</p> : <p className='text-sm font-medium text-stone-500 tracking-wider'>فروخته شد</p>}
          {isInCart &&
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity pizzaId={id} currenQuantity={currenQuantity} />
              <DeleteItem pizzaId={id} />
            </div>}
          {!soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>افزودن به سبد</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
