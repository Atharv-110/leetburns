import React from "react";
import { IMAGES } from "../assets";

const Footer = () => {
  return (
    <div className="absolute w-full bottom-0 left-0 text-center pb-2.5 md:pb-5 text-xs md:text-[1rem] flex items-center justify-center tracking-widest">
      Made with
      <span className="w-4 md:w-6 mx-2 md:mx-3">
        <img src={IMAGES.heart} alt="" className="w-full" />
      </span>
      by
      <a
        href="https://www.atharv110.tech/"
        target="_blank"
        className="ml-2 underline underline-offset-1 hover:scale-90"
      >
        Atharv Vani
      </a>
    </div>
  );
};

export default React.memo(Footer);
