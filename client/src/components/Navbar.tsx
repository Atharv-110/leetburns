import React from "react";
import LButton from "../@ui/LButton";
import { IMAGES } from "../assets";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar = () => {
  const imageUrl = useSelector((state: RootState) => state.image.imageUrl);
  return (
    <nav className="flex items-center pt-5 pb-3 justify-between">
      {imageUrl ? (
        <div className="w-[70px] md:w-[75px] h-full relative">
          <img
            src={IMAGES.fireFrameGif}
            alt="frame"
            className="absolute z-50 w-full left-0 right-0 bottom-0 -top-3 rounded-b-3xl m-auto"
          />
          <img
            src={imageUrl}
            alt="avatar"
            className="w-[55px] md:w-[60px] absolute left-0 right-0 bottom-0 top-0 m-auto bg-slate-100 rounded-t-xl rounded-b-3xl border-2 border-black"
          />
        </div>
      ) : (
        <img src={IMAGES.logo} alt="logo" className="w-[50px]" />
      )}

      <LButton
        text="GitHub"
        bg="#fff"
        onClick={() => window.open("https://github.com/Atharv-110")}
      />
    </nav>
  );
};

export default React.memo(Navbar);
