import VideoList from "./components/VideoList/VideoList"

const videoListData = [{
    id: 1,
    title: 'video 1',
    url: 'url 1',
  },
  {
    id: 2,
    title: 'video 2',
    url: 'url 2',
}]

function VideoFeature() {
  return (
    <VideoList videoListData={videoListData} />
  )
}

export default VideoFeature;
