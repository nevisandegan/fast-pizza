import { useState } from 'react';

import Button from "../../ui/Button"
import { useDispatch } from 'react-redux';

import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
  const navigate=useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username))
    navigate("/menu")
  }

  return (
    <form onSubmit={handleSubmit}>
      <p
        className="mb-4 text-sm 
       text-stone-600
       md:text-base
       "
      >
        خوش آمدید! لطفا با گفتن نام خود شروع کنید:
      </p>

      <input
        type="text"
        placeholder="اسمتون ؟"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />

      {username !== '' && (
        <div>
          <Button type="primary">شروع سفارش</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;