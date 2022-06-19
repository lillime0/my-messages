import Message from "../models/message.js";
import CustomAPIError from "../errors/custom-error.js";

export const getAllMessages = async (req, res) => {
  const messages = await Message.find({}).sort("-createdAt").limit(10);
  res.status(200).json({ messages, count: messages.length });
};
export const createMessage = async (req, res) => {
  const { email, message } = req.body;
  const msg = await Message.create({ email, message });
  res.status(201).json({ msg });
};
export const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const message = await Message.findOneAndDelete({ _id: messageId });
  if (!message) {
    throw new CustomAPIError(`No message with id ${_id}`, 404);
  }
  res.status(200).send();
};
// export const deleteAllMessages = async (req, res) => {
//   const messages = await Message.deleteMany();
//   if (!messages) {
//     throw new CustomAPIError(`No message to delete`, 404);
//   }
// res.status(204).send();
// };
