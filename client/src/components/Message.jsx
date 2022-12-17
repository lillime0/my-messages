import { useState, useEffect } from "react";
import { FaCheck, FaCopy, FaTrash, FaReply } from "react-icons/fa";
import { useAppContext } from "../context/messageContext";
import Alert from "./Alert";
import moment from "moment";
import Linkify from "linkify-react";

const Message = ({ _id, email, message, createdAt }) => {
  const { isAlertOpen, openAlert } = useAppContext();
  const [readMore, setReadMore] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  let date = moment(createdAt);
  // date = date.format("lll");
  date = date.fromNow();

  const toggleReadMore = () => setReadMore(!readMore);
  const copyText = text => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isCopied]);
  return (
    <article className="message-item">
      {isAlertOpen && <Alert id={_id} />}
      <a className="mailto" href={`mailto:${email}`}>
        {email}
      </a>
      <p className="message-text">
        <Linkify options={{ target: "blank" }}>
          {readMore ? message : `${message.substring(0, 300)}...`}
          <button className="message-btn" onClick={toggleReadMore}>
            {readMore ? "show less" : "read more"}
          </button>
        </Linkify>
      </p>
      <p className="message-date">{date}</p>
      <button
        title="delete"
        className="icons delete-icon"
        onClick={() => openAlert("danger")}
        aria-label="delete icon"
      >
        <FaTrash />
      </button>
      {isCopied && (
        <span className="icons copied">
          <FaCheck />
        </span>
      )}
      <button
        title="copy"
        className="icons copy-icon"
        onClick={() => copyText(message)}
        aria-label="copy icon"
      >
        <FaCopy />
      </button>
      <button
        title="reply"
        // onClick={reply}
        className="icons reply-icon"
        aria-label="reply icon"
      >
        <FaReply />
      </button>
    </article>
  );
};

export default Message;
