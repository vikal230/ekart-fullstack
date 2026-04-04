import React, { useContext } from "react";
import ai from "../assets/Ai.jpg";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Ai = () => {
  let { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  
  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  if (!recognition) {
    console.log("not supported");
  }

  recognition.onresult = (e) => {
    // console.log(e)
    const transcript = e.results[0][0].transcript.trim();
    if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("open") &&
      !showSearch
    ) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("close") &&
      showSearch
    ) {
      speak("closing search");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("collection") ||
      transcript.toLowerCase().includes("collections") ||
      transcript.toLowerCase().includes("product") ||
      transcript.toLowerCase().includes("products")
    ) {
      speak("opening collection page");
      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("about") ||
      transcript.toLowerCase().includes("aboutpage")
    ) {
      speak("opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("home") ||
      transcript.toLowerCase().includes("homepage")
    ) {
      speak("opening home page");
      navigate("/");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("cart") ||
      transcript.toLowerCase().includes("kaat") ||
      transcript.toLowerCase().includes("caat")
    ) {
      speak("opening your cart");
      navigate("/cart");
      setShowSearch(false);
    } else if (transcript.toLowerCase().includes("contact")) {
      speak("opening contact page");
      navigate("/contact");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("order") ||
      transcript.toLowerCase().includes("myorders") ||
      transcript.toLowerCase().includes("orders") ||
      transcript.toLowerCase().includes("my order")
    ) {
      speak("opening your orders page");
      navigate("/order");
      setShowSearch(false);
    } else {
      toast.error("Try Again");
    }
  };
  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] justify-start items-end flex cursor-pointer"
      onClick={(e) => recognition.start(e)}
    >
      <img
        src={ai}
        alt="Ai image"
        className="w-[70px] cursor-pointer rounded-full "
      />
    </div>
  );
};

export default Ai;
