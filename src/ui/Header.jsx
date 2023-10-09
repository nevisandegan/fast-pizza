import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';
import { useSelector } from 'react-redux';

export default function Header() {
  const username=useSelector(state=>state.user.username)
  return (
    <header
      className="flex items-center justify-between border-b 
        border-stone-200 bg-yellow-500 px-4 py-3
        sm:px-6
        "
    >
      <Link to="/" className="tracking-wide">
        رستوان فست پیتزا
      </Link>
     {username && <SearchOrder />}
      <Username />
    </header>
  );
}
