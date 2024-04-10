import PropTypes from 'prop-types'

Video.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

function Video(props: any) {
  const { id, title, url } = props;
  return (
    <div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{url}</div>
    </div>
  )
}

export default Video;
