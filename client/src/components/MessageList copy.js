import { useContext } from "react";
import { FaEnvelope } from "react-icons/fa";
import { AppContext } from "../context/messageContext";
import Message from "./Message";
import Loading from "./Loading";
import NoMessage from "./NoMessage";

const MessageList = () => {
  const { isLoading, getAllMessages, messages, count } = useContext(AppContext);

  return (
    <>
      {isLoading && <Loading />}
      {count === 0 ? (
        <NoMessage />
      ) : (
        <section className="messages-container" aria-label="all messages">
          <section className="messages-list">
            <h4 title="message length">
              <span className="email-icon" aria-label="email icon">
                <FaEnvelope />
              </span>
              {count}
            </h4>
            {messages.map(message => (
              <Message {...message} key={message._id} />
            ))}
            <button className="btn more-btn" onClick={getAllMessages}>
              More Messages
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default MessageList;
