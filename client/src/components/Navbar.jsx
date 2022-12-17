import { Link } from "react-router-dom";
import { FaSignOutAlt, FaAdjust, FaUser } from "react-icons/fa";
import { useAppContext } from "../context/messageContext";

const Navbar = () => {
  const { logout, toggleTheme } = useAppContext();

  return (
    <nav className="nav">
      <Link to="/" className="title nav-title" title="home">
        My Messages
      </Link>
      <div className="nav-icons">
        <Link
          to="/profile"
          className="nav-btn"
          title="profile"
          aria-label="user profile"
        >
          <FaUser />
        </Link>
        <button title="theme" onClick={toggleTheme} aria-label="toggle theme">
          <FaAdjust />
        </button>
        <button title="logout" onClick={logout} aria-label="logout">
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
