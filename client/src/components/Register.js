import { useState, useEffect, useContext } from "react";
import logo from "../logo.svg";
import { AppContext } from "../context/messageContext";
import { FaEye, FaSpinner } from "react-icons/fa";
import { REGISTER_ERROR } from "../context/actions";

const Register = () => {
  const {
    register,
    isLoading,
    user,
    isPasswordShown,
    toggleShownPassword,
    navigate,
    isError,
    errorType,
    error
  } = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const isInvalid =
    data.name === "" || data.password === "" || data.email === "";

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = data;
    register({ name, email, password });
  };
  useEffect(() => {
    document.title = "My Messages | Register";
  }, []);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <section className="container">
      <article className="register" aria-label="register">
        <h1 className="title register-title">My Messages</h1>
        <section className="form-container">
          <form className="form" method="POST" onSubmit={handleSubmit}>
            <input
              aria-label="Your name"
              aria-required="true"
              type="text"
              value={data.name}
              onChange={handleChange}
              placeholder="Your name"
              name="name"
              id="name"
              required
            />
            <input
              aria-label="Your email"
              aria-required="true"
              type="email"
              inputMode="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Your email"
              name="email"
              id="email"
              required
            />
            <div className="input-sec">
              <input
                aria-label="Your password"
                aria-required="true"
                type={isPasswordShown ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                placeholder="Your password"
                name="password"
                id="password"
                autoComplete="off"
                required
              />
              <span className="icons input-icon" onClick={toggleShownPassword}>
                <FaEye />
              </span>
            </div>
            {isError && (
              <p className="errors">{errorType === REGISTER_ERROR && error}</p>
            )}
            <button
              className={`btn btn-register ${isInvalid && "disabled"}`}
              type="submit"
            >
              {isLoading ? <FaSpinner /> : "Register"}
            </button>
          </form>
          <p className="owner">
            Owned by <img className="logo" alt="Lilli logo" src={logo} />
          </p>
        </section>
      </article>
    </section>
  );
};

export default Register;
