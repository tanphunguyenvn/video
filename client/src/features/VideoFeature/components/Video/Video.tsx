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
    <tr className='border-blue-100'>
      <td>{id}</td>
      {/* <a href={Config.VITE_BASE_URL+'/shares/'+id}> */}
      <td>
          <a href={url} target='blank'>
          <img src={youtubeImage} className='bg-transparent max-h-24'></img>
        </a>
      </td>
      <td>{title}</td>
      <td>{userEmail}</td>
    </tr>
  )
}

export default Video;
