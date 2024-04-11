import { useEffect, useState } from "react";
import VideoList from "./components/VideoList/VideoList"
import { getAllVideo } from "../../api/videoApi";


function VideoFeature() {
  const [videoListData, setVideoListData] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVideo();
        setVideoListData(res.data);
      } catch(error: any) {
        console.log(error)
        if (error.response.status === 401 ) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.reload();
        }        
      }
    })();
  }, []);

  return (
    <VideoList videoListData={videoListData} />
  )
}

export default VideoFeature;
