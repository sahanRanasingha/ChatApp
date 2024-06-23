import {useAuthContext} from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilepic : selectedConversation?.profilepic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
        <img src={profilePic} alt="user avatar" /> 
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  )
}

export default Message



// STARTER CODE FOR THIS FILE
//const Message = () => {
//    return (
//      <div className="chat chat-end">
//        <div className="chat-image avatar">
//          <div className="w-10 rounded-full">
//          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user avatar" /> 
//          </div>
//        </div>
//        <div className={`chat-bubble text-white bg-blue-500`}>Hi! Whats up</div>
//        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
//      </div>
//    )
//  }
  
//  export default Message
  
