import React, { useEffect, useState } from "react";
import { IMAGES } from "../assets";

const Loader = () => {
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
    <div className="w-full mt-20">
      <img src={IMAGES.fireGif} alt="" className="w-24 md:w-36 mx-auto" />
      <p className="text-center text-[0.7rem] md:text-xs leading-normal mt-1 text-gray-750">
        {loaderMessages[currentMessageIndex]}
      </p>
    </div>
  );
};

export default React.memo(Loader);
