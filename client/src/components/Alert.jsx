import { useAppContext } from "../context/messageContext";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { DELETE_MESSAGE_ERROR } from "../context/actions";

const Alert = ({ id }) => {
  const {
    isLoading,
    alertType,
    closeAlert,
    deleteMessage,
    error,
    errorType,
    isError
  } = useAppContext();

  return (
    <article className="alert-overlay">
      <section className="alert" role="alert">
        <button
          title="close"
          className="close"
          onClick={closeAlert}
          aria-label="close"
        >
          <FaTimes />
        </button>
        {alertType === "success" ? (
          <p>
            Thanks for your message.
            <br />
            I'll reply to you as soon as possible :)
          </p>
        ) : (
          <>
            <p>Do you really wanna delete this?</p>
            <div className="btn-container">
              <button className="alert-btn alert-cancel" onClick={closeAlert}>
                Cancel
              </button>
              <button
                className="alert-btn alert-delete"
                onClick={() => deleteMessage(id)}
              >
                {isLoading ? <FaSpinner /> : "Delete"}
              </button>
            </div>
            {isError && (
              <p className="errors">
                {errorType === DELETE_MESSAGE_ERROR && error}
              </p>
            )}
          </>
        )}
      </section>
    </article>
  );
};

export default Alert;
