import React, { useEffect, useState } from "react";
import { IMAGES } from "../assets";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
  baseClasses?: string;
  iconClasses?: string;
  showMessage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  baseClasses,
  iconClasses,
  showMessage = true,
}) => {
  const loaderMessages: string[] = [
    "Hang on! We're roasting your LeetCode stats.",
    "Wait! Our server needs a laugh too",
    "Almost there! Crafting some fresh insults for you",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === loaderMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [loaderMessages.length]);
  return (
    <div className={twMerge("w-full mt-20", baseClasses)}>
      <img
        src={IMAGES.fireGif}
        alt=""
        className={twMerge("w-24 sm:w-36 mx-auto", iconClasses)}
      />
      {showMessage && (
        <p className="text-center text-[0.7rem] md:text-xs leading-normal mt-1 text-gray-750">
          {loaderMessages[currentMessageIndex]}
        </p>
      )}
    </div>
  );
};

const MemoizedLoader = React.memo(Loader);
export default MemoizedLoader;
