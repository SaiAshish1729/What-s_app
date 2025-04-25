const Conversations = require("../Model/conversationModel");
const Messages = require("../Model/messageModel");

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        if (senderId === receiverId) {
            return res.status(400).send({ success: false, message: "You can't send message to youself." })
        }
        const { message } = req.body;

        let gotConversation = await Conversations.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversations.create({
                participants: [senderId, receiverId]
            })
        };
        const newMessage = await Messages.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        };
        await gotConversation.save();
        return res.status(200).send({ status: true, message: "Message send successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, Message: "Server error while sending message", error })
    }
}

const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversations.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        return res.status(200).json({ message: "Messages fetched successfully.", data: conversation?.messages });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    sendMessage,
    getMessage,
}   