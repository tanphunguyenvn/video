import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddVideoFeature from './features/AddVideo/AddVideoFeature.tsx';
import { Config } from './config/config.ts';

const socket = new WebSocket(Config.VITE_WS_URL);
socket.addEventListener('open', () => {
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
  if (data?.message?.type === 'alert') {
    const message = data?.message?.message;
    const user = localStorage.getItem('user');
    if (message.indexOf(user) === -1) {
      alert(message);
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/shares",
    element: <AddVideoFeature/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
