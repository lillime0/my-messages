import { useEffect, useContext } from "react";
import Navbar from "./Navbar";
import MessageList from "./MessageList";
import Footer from "./Footer";
import { AppContext } from "../context/messageContext";

const Home = () => {
  const { getAllMessages } = useContext(AppContext);

  useEffect(() => {
    document.title = "My Messages";
    getAllMessages();
  }, []);
  return (
    <>
      <Navbar />
      <MessageList />
      <Footer />
    </>
  );
};

export default Home;
