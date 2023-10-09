import { useSelector } from "react-redux";
import { convertEnNumberToPersian } from "../../utils/helpers"
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";


function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currenQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0 space-x-1 tracking-wide">
        <span></span><span className="font-semibold"> {convertEnNumberToPersian(quantity)}عدد</span><span> {name}</span>
      </p>
      <div className="flex justify-between items-center sm:gap-6 ">
        <p className="text-sm font-bold ">{convertEnNumberToPersian(totalPrice)}هزار تومان</p>
        <UpdateItemQuantity pizzaId={pizzaId} currenQuantity={currenQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
