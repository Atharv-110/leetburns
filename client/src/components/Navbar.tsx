import React from "react";
import LButton from "../@ui/LButton";
import { IMAGES } from "../assets";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar = () => {
  const imageUrl = useSelector((state: RootState) => state.image.imageUrl);
  return (
    <nav className="flex items-center py-5 justify-between">
      {imageUrl ? (
        <div className="w-[65px] h-full relative">
          <img
            src={IMAGES.frame}
            alt="frame"
            className="absolute z-50 w-full left-0 right-0 bottom-0 top-0 m-auto"
          />
          <img
            src={imageUrl}
            alt="avatar"
            className="absolute p-2 left-0 right-0 bottom-0 top-0 m-auto bg-slate-100"
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
