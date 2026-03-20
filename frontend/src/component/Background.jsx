import React from "react";
import first from "../assets/f.webp";
import second from "../assets/s.webp";
import third from "../assets/t.webp";
import four from "../assets/fo.webp";
const Background = ({ heroCount }) => {
  if (heroCount === 0) {
    return (
      <img
        src={first}
        alt="first image"
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 1) {
    return (
      <img
        src={second}
        alt="second image"
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 2) {
    return (
      <img
        src={third}
        alt="second image"
        className="w-[100%] h-[100%] float-left overflow-auto object-cover"
      />
    );
  } else if (heroCount === 3) {
  return  (<img
      src={four}
      alt="four image"
      className="w-[100%] h-[100%] float-left overflow-auto object-cover"
    />);
  }
};

export default Background;
