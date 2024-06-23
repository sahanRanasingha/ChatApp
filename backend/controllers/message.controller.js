import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecevierSocketId, io } from "../socket/soket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //await conversation.save();
        //await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY TO BE ADDED HERE
        const receiverSocketId = getRecevierSocketId(receiverId);
        if(receiverSocketId){
            // send the message to the receiver
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message  );
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // populate the messages field

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message  );
        res.status(500).json({ message: "Internal Server Error" });
    }
};