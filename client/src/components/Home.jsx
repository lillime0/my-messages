import { useEffect } from "react";
import Navbar from "./Navbar";
import MessageList from "./MessageList";
import Footer from "./Footer";
import { useAppContext } from "../context/messageContext";

const Home = () => {
  const { getAllMessages } = useAppContext();

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
