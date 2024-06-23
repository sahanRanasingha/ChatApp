import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import nortificationSound from "../assets/sounds/nortification.mp3";

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages,setMessages} = useConversation();

  useEffect(() => {
    socket?.on("newMessage",(newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(nortificationSound);
      sound.play();
        setMessages([...messages,newMessage]);
    });
    return () => {
        socket?.off("newMessage");
    };
  },[socket,setMessages,messages])
}

export default useListenMessages
