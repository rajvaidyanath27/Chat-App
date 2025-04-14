import React from 'react';
import axios from 'axios';

const Chatpage = () => {

  const fetchChats = async ()=> {
       const data = await axios.get('/api/chat');

       console.log(data);
  }

  return (
    <div>
      <h1>Chatpage</h1>
    </div>
  )
}

export default Chatpage
