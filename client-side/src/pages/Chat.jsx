/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const {room} = useParams()
  const socket = io(import.meta.env.VITE_API_URL);
  const [messagesReceive, setMessagesReceive] = useState([]);
  const [messageInput, setMessageInput] = useState(''); 




  function sendMessage() {
    if (messageInput.trim() !== '') {
      socket.emit('send-message', messageInput,room); 
      setMessageInput(''); 
    }

    async function UpdateChat(){
      const chatHistroy = messagesReceive;
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/incomingOrders/${cookies.User._id}`,
      chatHistroy ,
      { headers: { Authorization: `${cookies.UserToken}` } })
      console.log(res)
    }
    try{
      UpdateChat()
    }catch(error){
      console.log('chat history didnt sent succ !')
    }
  }

console.log('messagesReceive',messagesReceive)
  //handle socket
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`You are connected on ${socket.id}`)
      socket.emit("join-room", room)
      console.log(`front joined room ${room}`)
    });

    // Listen for incoming chat messages from the server
    socket.on('receive-message', (message) => {
      // console.log('recieved this',message)
      setMessagesReceive(prevMessages => {
        if (!Array.isArray(prevMessages)) {
          prevMessages = [];
        }
        return [...prevMessages, message]});
    });

    // Clean up the socket event listener when the component unmounts and send the chat history to backend
    return () => {
      socket.off('connect');
      socket.off('receive-message');
    };
  }, []);


  // get chat history
  useEffect(()=>{
    async function getChat(){
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/incomingOrders/user/${cookies.User._id}`,
      { headers: { Authorization: `${cookies.UserToken}` } })
      setMessagesReceive(res.data.incomingOrder.chatHistroy)
      console.log('chatHistroy',res.data.incomingOrder.chatHistroy)
    }
    try{
      getChat()
    }catch(error){
      console.log('cannot get chat history', error)
    }
  },[cookies.User._id, cookies.UserToken])



  return (
    <div className='min-h-[88vh] mt-[65px] bg-primary py-4'>
      {/* ----------------messages------------------- */}
      <div className='h-[70vh] w-[70vw] border-2 my-8 p-5 mx-auto bg-white rounded-md overflow-y-auto'>
        {messagesReceive && messagesReceive.map((message, index) => (
          <p key={index} className='mb-2'>
            {message}
          </p>
        ))}
      </div>
      {/* --------------------user input--------------  */}
      <div className='mx-auto w-[70vw] flex items-center justify-center'>
        <input
          type="text"
          className='w-[90%] h-[50px] border p-5 rounded-md mr-5 outline-none'
          placeholder='Type your message here'
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
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
