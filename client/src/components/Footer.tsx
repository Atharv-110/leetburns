import React from "react";
import { IMAGES } from "../assets";

const Footer = () => {
  return (
    <div className="absolute w-full bottom-0 left-0 text-xs sm:text-sm text-center pb-2.5 flex items-center justify-center tracking-widest">
      Made with
      <span className="w-4 sm:w-5 mx-2 sm:mx-3">
        <img src={IMAGES.heart} alt="" className="w-full" />
      </span>
      by
      <a
        href="https://github.com/Atharv-110"
        target="_blank"
        className="ml-2 underline underline-offset-1 hover:scale-90"
      >
        Atharv Vani
      </a>
    </div>
  );
};

export default React.memo(Footer);
