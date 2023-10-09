import { convertEnNumberToPersian } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-3 ">
    <span></span>
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold space-x-2"><span>{convertEnNumberToPersian(quantity)}عدد</span><span></span> {name}</span>
        </p>
        <p className="font-bold">{convertEnNumberToPersian(totalPrice)} هزار تومان</p>
      </div>
      <p className="text-sm text-stone-500 mt-1">{isLoadingIngredients ? 'در حال بارگذاری ...' :
         `مواد تشکیل دهنده  : ${ingredients.join(', ')} `
      }</p>
    </li>
  );
}

export default OrderItem;
