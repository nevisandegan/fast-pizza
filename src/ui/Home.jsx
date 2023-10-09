import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';

import Button from '../ui/Button'

function Home() {
  const username = useSelector(state => state.user.username)
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold  md:text-3xl tracking-wide">
        تجربه بهترین پیتزاها
        <br />
        <span className=" text-yellow-500 inline-block mt-4">
          مستقیماً از فر، مستقیماً برای شما
        </span>
      </h1>
      {username === '' ? <CreateUser /> : <Button to='/menu' type='primary'>به سفارش ادامه دهید {username} جان</Button>}
    </div>
  );
}

export default Home;
