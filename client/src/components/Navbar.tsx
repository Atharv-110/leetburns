import LButton from "../@ui/LButton";
import { IMAGES } from "../assets";

const Navbar = () => {
  return (
    <nav className="flex items-center px-10 py-5 justify-between">
      <div className="flex gap-x-1 items-center">
        <img src={IMAGES.logo} alt="logo" className="w-[50px]" />
        <h1 className="text-lg font-semibold tracking-wide">Leetburns</h1>
      </div>
      <LButton text="GitHub" bg="#fff" />
    </nav>
  );
};

export default Navbar;
