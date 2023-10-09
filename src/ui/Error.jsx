import {  useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.log("first");
  
  return (
    <div className='flex items-center justify-center flex-col mt-5'>
      <h1>مشکلی پیش آمده 😢</h1>
      {/* <p>{error.data || error.message}</p> */}
      <LinkButton to="-1">بازگشت&larr;</LinkButton>
    </div>
  );
}

export default Error;
