import React from "react";
import { IMAGES } from "../assets";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useUserStats } from "../hooks/useUserStats";
import { Card } from "pixel-retroui";
import Loader from "./Loader";

const Navbar = () => {
  const imageUrl = useSelector((state: RootState) => state.image.imageUrl);
  const { stats, loading, error, refetch } = useUserStats();

  React.useEffect(() => {
    if (imageUrl) {
      refetch();
    }
  }, [imageUrl, refetch]);

  return (
    <nav className="flex items-center py-4 sm:p-4 justify-between">
      {imageUrl ? (
        <div className="w-12 sm:w-[70px] h-fit relative">
          <img
            src={IMAGES.fireFrameGif}
            alt="frame"
            className="absolute z-50 w-full left-0 right-0 bottom-0 top-0 rounded-b-2xl m-auto"
          />
          <img
            src={imageUrl}
            alt="avatar"
            className="w-10 sm:w-[60px] absolute left-0 right-0 -bottom-1 top-0 m-auto bg-slate-100 rounded-t-xl rounded-b-3xl border-2 border-black opacity-90"
          />
        </div>
      ) : (
        <img src={IMAGES.logo} alt="logo" className="w-12" />
      )}
      <div className="flex items-center gap-x-px">
        <Card shadowColor="none" className="w-fit text-xs sm:text-sm">
          Total Users
        </Card>
        <Card
          shadowColor="none"
          className="w-fit text-xs sm:text-sm font-bold text-orange-500"
        >
          {loading || error ? (
            <Loader
              showMessage={false}
              baseClasses="mt-0"
              iconClasses="w-4 sm:w-5"
            />
          ) : (
            stats?.totalRequests
          )}
        </Card>
      </div>
    </nav>
  );
};

const MemoizedNavbar = React.memo(Navbar);
export default MemoizedNavbar;
