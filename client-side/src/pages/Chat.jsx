import  { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import io from 'socket.io-client';

const Chat = () => {
  const socket = io(import.meta.env.VITE_API_URL);
  const [messagesReceive, setMessagesReceive] = useState([]);
  const [messageInput, setMessageInput] = useState(''); 


  function sendMessage() {
    if (messageInput.trim() !== '') {
      socket.emit('send-message', messageInput); 
      setMessageInput(''); 
    }
  }

    // Listen for incoming chat messages from the server
    socket.on('receive-message', (message) => {
      setMessagesReceive(message);
    });

console.log('messagesReceive', messagesReceive)

  useEffect(() => {
    socket.on('connect', () => {
      setMessagesReceive(`You are connected on ${socket.id}`);
    });


    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('chat:message');
    };
  }, []);


  
  return (
    <div className='min-h-[88vh] mt-[65px] bg-primary py-4'>
      {/* ----------------messages------------------- */}
      <div className='h-[70vh] w-[70vw] border-2 my-8 p-5 mx-auto bg-white rounded-md overflow-y-auto'>
          <pre>{messagesReceive && messagesReceive.map((message,i)=> (
            <p key={i}>{message}</p>
          ))}
        </pre> 
      </div>
      {/* --------------------user input--------------  */}
      <div className='mx-auto w-[70vw] flex items-center justify-center'>

        <input
          type="text"
          className='w-[90%] h-[50px] border p-5 rounded-md mr-5 outline-none'
          placeholder='Type your message here'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}  />
        <button
          onClick={sendMessage}
          className='bg-green-500 text-white py-3 px-4 rounded-md font-semibold flex justify-center items-center mt-[2px] hover:bg-green-600'>
          <FiSend size={23} />
        </button>

      </div>
    </div>
  );
};

export default Chat;
