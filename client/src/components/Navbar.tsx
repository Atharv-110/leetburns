import LButton from "../@ui/LButton";
import { IMAGES } from "../assets";

const Navbar = () => {
  return (
    <nav className="flex items-center py-5 justify-between">
      <div className="flex gap-x-1 items-center">
        <img src={IMAGES.logo} alt="logo" className="w-[40px]" />
        <h1 className="md:text-lg font-semibold">LeetBurns</h1>
      </div>
      <LButton text="GitHub" bg="#fff" />
    </nav>
  );
};

export default Navbar;
