import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Chatpage = () => {

  const fetchChats = async ()=> {
       const data = await axios.get('/api/chat');

       console.log(data);
  }

  useEffect(() => {
    fetchChats();
  },[]);

  return (
    <div>
      <h1>Chatpage</h1>
    </div>
  )
}

export default Chatpage
