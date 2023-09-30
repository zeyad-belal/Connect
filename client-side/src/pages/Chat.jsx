/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { FiSend } from 'react-icons/fi';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
  const inputField = useRef()
  const [cookies, setCookie] = useCookies(["UserToken", "User"]);
  const { room } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sellerID = queryParams.get('sellerID');
  const buyerID = queryParams.get('buyerID');
  const [otherGuyData, setOtherGuyDataData] = useState({}); 

  const socket = io(import.meta.env.VITE_API_URL);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(''); 



  function sendMessage() {
    if (messageInput.trim() !== '') {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; 
  
      socket.emit('send-message', `${cookies.User.first_name} :-: ${formattedHours}:${minutes} ${ampm} :-: ${messageInput}`, room);
      setMessageInput('');
    }
  }
  



  //handle socket
  useEffect(() => {
    socket.on('connect', () => {
      console.log(`You are connected on ${socket.id}`)
      socket.emit("join-room", room)
      console.log(`front joined room ${room}`)
    });

    // Listen for incoming chat messages from the server
    socket.on('receive-message', (message) => {
      message? 
      setMessages(prevMessages => [...prevMessages, message] )
      : ''
    });

    // Clean up the socket event listener before the component unmounts and send the chat history to backend
    return () => {
      socket.off('connect');
      socket.off('receive-message');
    };
  }, [room, socket]);

console.log(messages)
  // get chat history
  useEffect(()=>{
    async function getChat(){
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/incomingOrders/user/${sellerID}`,
      { headers: { Authorization: `${cookies.UserToken}` } })
      const currentIncomingOrder = res.data.incomingOrder.map((order)=>{
        if(order.buyer._id == buyerID){
          return order  
        } 
      })
      setMessages(currentIncomingOrder[0].chatHistroy || [])
    }
    try{
      sellerID ?getChat() : ''
    }catch(error){
      console.log('cannot get chat history', error)
    }
  },[buyerID, cookies.User._id, cookies.UserToken, sellerID])

  
  // send chat histroy
  useEffect(()=>{
    async function UpdateChat(){
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/incomingOrders/${sellerID}`,
      {chatHistroy :messages } ,
      { headers: { Authorization: `${cookies.UserToken}` } })
    }
    try{
      messages ? UpdateChat() : ''
    }catch(error){
      console.log('chat history didnt sent succ !')
    }
  },[cookies.UserToken, messages, sellerID])

  // getOtherGuyData
  useEffect(()=>{
    async function getOtherGuyData(){
      const OtherGuyId =  cookies.User._id == buyerID ? sellerID :  buyerID;
      const OtherGuyRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${OtherGuyId}`,
      { headers: { Authorization: `${cookies.UserToken}` } })
      setOtherGuyDataData(OtherGuyRes.data.user)
    }
    try{
      getOtherGuyData()
    }catch(error){
      console.log('buyer data didnt arrive correctly',error)
    }
  },[buyerID, cookies.User._id, cookies.UserToken, sellerID])



  useEffect(()=>{
    inputField.current.focus()
  },[])


  return (
    <div className='min-h-[88vh] mt-[65px] bg-primary pb-5 pt-3'>
      {/* ----------------messages------------------- */}
      <div className='mx-auto  w-[70vw]  flex my-3'>
        <div className="w-[40px] h-[40px] mr-2  flex gap-2 " >
          <img
          className="w-full h-full object-cover rounded-full"
          src={otherGuyData.avatar}
          alt="User Avatar" />
        </div>
        <h1 className='text-lg font-medium'>{otherGuyData &&`${otherGuyData.first_name} ${otherGuyData.last_name}`}</h1>
      </div>
      <div className='h-[67vh] w-[70vw] border-2 my-2 p-5 mx-auto flex flex-col bg-white rounded-md overflow-y-auto'>
        {messages && messages.map((message, index) => (
          <div key={index}  className={`mb-1 p-2 rounded-xl w-fit flex 
          ${message.split(":-:")[0].trim() == cookies.User.first_name.trim() ?
          ' self-end' : ''}`}
          >
            {/* ---------other guy image---------  */}
            {message.split(":-:")[0].trim() != cookies.User.first_name.trim() ?
              <div className="w-[40px] h-[40px] mr-2  flex gap-2 " >
                <img
                className="w-full h-full object-cover"
                src={otherGuyData.avatar}
                alt="User Avatar" />
              </div>
            :''}
            {/* ------------the message------------- */}
              <div className='h-fit flex flex-col'>
                <p  className={` py-2 px-4  ${message.split(":-:")[0].trim() == cookies.User.first_name.trim() ?
                'bg-secHover rounded-b-2xl rounded-tl-2xl  ' : 'bg-gray-300 rounded-b-2xl rounded-tr-2xl mt-5'}`}
                >
                  {message.split(":-:")[2]}
                </p>
                {/* -----------------date------------------ */}
                <span className={`text-gray-400 text-xs ml-2 mt-1 ${message.split(":-:")[0].trim() == cookies.User.first_name.trim() ? 'self-end mr-2': ''} `} 
                >{message.split(":-:")[1]}</span>
              </div>
            </div>
        ))}
      </div>



      {/* -----------------------------user input-----------------------------------------------------  */}
      <div className='mx-auto w-[70vw]  flex items-center justify-between'>
        <input
        ref={inputField}
          type="text"
          className='w-[95%] h-[50px] border p-5 rounded-md mr-5 outline-none'
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
