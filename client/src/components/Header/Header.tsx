
import { Login } from '../Login/Login';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <div className='p-5 flex'>
      <Logo />
      <Login />
    </div>
  )
}
