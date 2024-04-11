import './App.css'
import Header from './components/Header/Header'
import { Config } from './config/config';
import VideoFeature from './features/VideoFeature/VideoFeature'

function App() {
  const socket = new WebSocket(Config.VITE_WS_URL);
  socket.addEventListener('open', () => {
    console.log('connected')
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'AlertsChannel'
      })
    }

    socket.send(JSON.stringify(msg))
  });
  
  // Listen for messages
  socket.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log(data)
    if (data?.message?.type === 'alert') {
      alert(data?.message?.message);
      return;
    }
  });

  return (
    <>
      <Header isSharePage={false}/>
      <VideoFeature />
    </>
  )
}

export default App;
