import { useContext } from "react";
import { AppContext } from "../context/messageContext";
import { FaSpinner } from "react-icons/fa";
import { FETCH_MESSAGES_ERROR } from "../context/actions";

const NoMessage = () => {
  const { getAllMessages, errorType, error, isLoading } =
    useContext(AppContext);
  return (
    <section className="no-messages" aria-label="no message">
      <p>
        {errorType === FETCH_MESSAGES_ERROR ? error : "No messages left..."}
      </p>
      <button className="btn" onClick={getAllMessages}>
        {isLoading ? <FaSpinner /> : "Refresh"}
      </button>
    </section>
  );
};

export default NoMessage;
