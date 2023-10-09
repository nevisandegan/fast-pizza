import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className='px-4 py-3'>
      <LinkButton
        to="/menu"
      >
        بازگشت به منو  &larr;
      </LinkButton>

      <p className='font-semibold mt-7 tracking-wide'>سبد خرید شما خالی است ، برای خرید شروع کنید  :)</p>
    </div>
  );
}

export default EmptyCart;
