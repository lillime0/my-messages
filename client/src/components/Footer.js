import logo from "../logo.svg";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <hr />
      <p>
        Made with ️❤️ by{" "}
        <img className="footer-logo" alt="Lilli logo" src={logo} /> &copy;{" "}
        {year}
      </p>
    </footer>
  );
};

export default Footer;
