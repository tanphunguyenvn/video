import homeLogo from '../../assets/home.svg';

function Logo() {
  return (
    <div className="min-w-60 max-h-30">
      <a href="/" className="flex">
        <img src={homeLogo} className="home max-w-12 mx-2" alt="Home" />
        <div className="h-12 align-bottom">
          <p className="mt-3 text-2xl font-bold">Funny Video</p>
        </div>
      </a>
    </div>
  )
}

export default Logo;
