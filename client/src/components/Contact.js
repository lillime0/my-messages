import { useEffect, useContext } from "react";
import { AppContext } from "../context/messageContext";
import Alert from "./Alert";
import { FaSpinner } from "react-icons/fa";
import logo from "../logo.svg";
import { CREATE_MESSAGE_ERROR } from "../context/actions";

const Contact = () => {
  const {
    email,
    message,
    isError,
    error,
    errorType,
    isAlertOpen,
    handleChange,
    createMessage,
    isLoading
  } = useContext(AppContext);
  const messageLength = message.length;
  const isInvalid = email === "" || messageLength < 10;

  const handleSubmit = async e => {
    e.preventDefault();
    createMessage({ email, message });
  };

  useEffect(() => {
    document.title = "My Messages | Contact";
  }, []);
  return (
    <section className="container">
      <article className="contact" aria-label="contact">
        <h2 className="title contact-title">Contact me</h2>
        <p className="contact-text">
          Have any questions, inquiries, or suggestions?
          <br />
          Feel free to send me a message.
        </p>
        <section className="form-container">
          {isAlertOpen && <Alert />}
          <form className="form" method="POST" onSubmit={handleSubmit}>
            <input
              aria-label="Your email"
              aria-required="true"
              placeholder="Your Email"
              type="email"
              inputMode="email"
              value={email}
              onChange={handleChange}
              name="email"
              id="email"
              required
            />
            <textarea
              aria-label="Your message"
              aria-required="true"
              placeholder="Your Message..."
              value={message}
              onChange={handleChange}
              name="message"
              id="message"
              minLength={10}
              required
            ></textarea>
            {isError && (
              <p className="errors">
                {errorType === CREATE_MESSAGE_ERROR && error}
              </p>
            )}
            <p className="message-length">
              {messageLength > 0 && messageLength}
            </p>
            <button
              type="submit"
              className={`btn btn-contact ${isInvalid && "disabled"}`}
            >
              {isLoading ? <FaSpinner /> : "Send"}
            </button>
          </form>
        </section>
        <p className="owner">
          Owned by <img className="logo" alt="lilli logo" src={logo} />
        </p>
      </article>
    </section>
  );
};

export default Contact;
