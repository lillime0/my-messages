import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/messageContext";
import { FaEye, FaSpinner } from "react-icons/fa";
import logo from "../logo.svg";
import { LOGIN_ERROR } from "../context/actions";

const Login = () => {
  const {
    user,
    isLoading,
    login,
    isError,
    errorType,
    error,
    isPasswordShown,
    toggleShownPassword,
    navigate
  } = useContext(AppContext);

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const isInvalid = data.password === "" || data.email === "";

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = data;
    login({ email, password });
  };

  useEffect(() => {
    document.title = "My Messages | Login";
  }, []);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <section className="container">
      <article className="login" aria-label="login">
        <h1 className="title login-title">My Messages</h1>
        <section className="form-container">
          <form className="form" method="POST" onSubmit={handleSubmit}>
            <input
              aria-label="Your email"
              aria-required="true"
              inputMode="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="My Email"
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
                placeholder="My Password"
                name="password"
                id="password"
                autoComplete="off"
                required
              />
              {/*turn this span to button so it be focusable??*/}
              <span className="icons input-icon" onClick={toggleShownPassword}>
                <FaEye />
              </span>
            </div>
            {isError && (
              <p className="errors">{errorType === LOGIN_ERROR && error}</p>
            )}
            <button
              className={`btn btn-login ${isInvalid && "disabled"}`}
              type="submit"
            >
              {isLoading ? <FaSpinner /> : "Login"}
            </button>
            <p>
              Not Lilli?{" "}
              <Link to="/contact" className="contact-me">
                Contact me
              </Link>
            </p>
          </form>
          <p className="owner">
            Owned by <img className="logo" alt="Lilli logo" src={logo} />
          </p>
        </section>
      </article>
    </section>
  );
};

export default Login;
