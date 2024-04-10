
import homeLogo from '../../assets/home.svg';

export const Logo = () => {
  return (
    <div className="min-w-40 max-h-30">
      <a href="/" className="flex">
        <img src={homeLogo} className="home max-w-12 mx-2" alt="Home" />
        <div className="h-12 align-bottom">
          <p className="mt-3">Funny Video</p>
        </div>
      </a>
    </div>
  )
}
