import './App.css'
import Header from './components/Header/Header'
import VideoFeature from './features/VideoFeature/VideoFeature'

function App() {
  return (
    <>
      <Header isSharePage={false}/>
      <VideoFeature />
    </>
  )
}

export default App;
