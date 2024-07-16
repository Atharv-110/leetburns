import React from "react";
import LButton from "../@ui/LButton";
import { IMAGES } from "../assets";

const Navbar = () => {
  return (
    <nav className="flex items-center py-5 justify-between">
      <div className="flex gap-x-1 items-center">
        <img src={IMAGES.logo} alt="logo" className="w-[35px]" />
        <h1 className="md:text-[1.2rem] font-semibold">Leetburns</h1>
      </div>
      <LButton
        text="GitHub"
        bg="#fff"
        onClick={() => window.open("https://github.com/Atharv-110")}
      />
    </nav>
  );
};

export default React.memo(Navbar);
