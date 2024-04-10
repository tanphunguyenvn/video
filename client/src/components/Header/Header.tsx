
import Login from '../Login/Login';
import Logo from '../Logo/Logo';

function Header() {
  return (
    <div className='p-5 flex'>
      <Logo />
      <Login />
    </div>
  )
}

export default Header;
