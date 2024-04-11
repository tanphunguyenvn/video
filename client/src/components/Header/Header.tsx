
import Login from '../Login/Login';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';

Header.propTypes = {
  isSharePage: PropTypes.bool.isRequired,
}

function Header(props: any) {
  const { isSharePage } = props;
  return (
    <div className='p-5 flex'>
      <Logo />
      <Login isSharePage={isSharePage}/>
    </div>
  )
}

export default Header;
