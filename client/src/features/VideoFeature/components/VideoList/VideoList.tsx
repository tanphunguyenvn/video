import PropTypes from 'prop-types';
import Video from '../Video/Video';

VideoList.propTypes = {
  videoListData: PropTypes.array,
};

VideoList.defaultProps = {
  videoListData: [],
};

function VideoList(props: any) {
  const { videoListData } = props;
  return (
    <div>
      {
        videoListData.map(
          (video: any) => (
            <Video key={video.id} id={video.id} title={video.title} url={video.url} />
          )
        )
      }
    </div>
  )
};

export default VideoList;
