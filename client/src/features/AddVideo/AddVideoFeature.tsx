import { useState } from 'react'

import Header from "../../components/Header/Header";
import { createVideo } from '../../api/videoApi';

function AddVideoFeature() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleAddVideo = async() => {
    try {
      const payload = {
        share: {
          title,
          url,
        }
    }
      const res = await createVideo(payload);
      if (res.status === 201) {
        alert('create video success');
      }
    } catch(error: any) {
      if (error.response.status === 401 ) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload();
      }
    }
  }

  return (
    <>
      <Header isSharePage={true}/>
      <div className='max-w-xl'>
        <input
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1'
          id='title'
          type='text'
          placeholder='enter video title'
          onChange={(event)=> setTitle(event.target.value)}
        />
        <input
          className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1'
          id='url'
          type='text'
          placeholder='enter youtube url'
          onChange={(event)=> setUrl(event.target.value)}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1 mt-2'
          onClick={async () => handleAddVideo()}
        >Share</button>
      </div>
    </>
  )
}

export default AddVideoFeature;
