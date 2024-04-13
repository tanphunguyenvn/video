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
    // <div>
      <table className='table-auto text-center'>
        <thead>
          <tr>
            <th className='min-w-12'>Id</th>
            <th className='min-w-40 center'>Logo</th>
            <th className='min-w-96'>Title</th>
            <th className='min-w-96'>Share by</th>
          </tr>
        </thead>
        <tbody>
          {
            videoListData.map(
              (video: any) => (
                <Video key={video.id} id={video.id} title={video.title} url={video.url} userEmail={video.user_email} />
              )
            )
          }
        </tbody>
      </table>
    // </div>
  )
};

export default VideoList;
