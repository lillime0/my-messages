import { useState, useEffect } from "react";
import { FaPen, FaEye, FaSpinner } from "react-icons/fa";
import { UPDATE_USER_ERROR } from "../context/actions";
import { useAppContext } from "../context/messageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Profile = () => {
  const {
    isLoading,
    user,
    updateUser,
    isError,
    error,
    isPasswordShown,
    toggleShownPassword,
    errorType,
    status
  } = useAppContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    name: user?.name,
    email: user?.email,
    password: ""
  });

  const toggleIsDisable = () => setIsDisabled(!isDisabled);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = data;
    updateUser({ name, email, password });
  };

  useEffect(() => {
    document.title = "My Messages | Profile";
  }, []);

  return (
    <>
      <Navbar />

      <form
        className="profile form"
        onSubmit={handleSubmit}
        aria-label="user profile"
      >
        <span
          className="icons edit-icon"
          onClick={toggleIsDisable}
          aria-label="edit icon"
          title="edit"
        >
          <FaPen />
        </span>
        <h2 className="title profile-title">Profile</h2>
        <section className="profile-container">
          <section className="user-row">
            <label htmlFor="name">Name</label>
            <input
              aria-required="true"
              className={!isDisabled && "enabled"}
              type="text"
              value={data.name || ""}
              onChange={handleChange}
              name="name"
              disabled={isDisabled && "disabled"}
            />
          </section>
          <section className="user-row">
            <label htmlFor="name">Email</label>
            <input
              aria-required="true"
              inputMode="email"
              className={!isDisabled && "enabled"}
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              disabled={isDisabled && "disabled"}
            />
          </section>
          <section className="user-row">
            <label htmlFor="password">Password</label>
            <div class="input-sec">
              <input
                aria-required="true"
                className={!isDisabled && "enabled"}
                type={isPasswordShown ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="off"
                disabled={isDisabled && "disabled"}
              />
              <span className="icons input-icon" onClick={toggleShownPassword}>
                <FaEye />
              </span>
            </div>
          </section>
          {isError && (
            <p className="errors">{errorType === UPDATE_USER_ERROR && error}</p>
          )}
          {status && <p className="errors">{status}</p>}
          <button className="btn btn-profile">
            {isLoading ? <FaSpinner /> : "Save"}
          </button>
        </section>
      </form>

      <Footer />
    </>
  );
};

export default Profile;
