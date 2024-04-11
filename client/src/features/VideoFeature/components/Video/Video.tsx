import PropTypes from 'prop-types'
// import { Config } from '../../../../config/config';

Video.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
}

const youtubeImage='https://cdn-icons-png.flaticon.com/256/1384/1384060.png'

function Video(props: any) {
  const { id, title, userEmail, url } = props;
  return (
    <div className='flex text-2xl border-b-2 border-blue-100'>
      <p className='p-8'>{id}</p>
      {/* <a href={Config.VITE_BASE_URL+'/shares/'+id}> */}
      <a href={url} target='blank'>
        <img src={youtubeImage} className='bg-transparent max-h-24'></img>
      </a>
      <p className='p-8'>{title}</p>
      <p className='p-8'>Share by: {userEmail}</p>
    </div>
  )
}

export default Video;
