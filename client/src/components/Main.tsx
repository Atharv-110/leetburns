import React from "react";
import LInput from "../@ui/LInput";
import { IMAGES } from "../assets";
import { Card } from "pixel-retroui";
import Loader from "./Loader";
import useFetchData from "../hooks/useFetchData";

const Main = () => {
  const {
    username,
    setUsername,
    roastMessage,
    error,
    loading,
    handleKeyDown,
    fetchUserData,
  } = useFetchData();
  return (
    <section className="max-w-[800px] w-full mx-auto flex flex-col items-center mt-8">
      <LInput
        placeholder="Enter your leetcode username"
        icon={IMAGES.play}
        className="w-full text-xs md:text-base"
        onChange={(e) => setUsername(e.target.value)}
        onIconClick={() => username && fetchUserData(username)}
        onKeyDown={handleKeyDown}
      />
      {roastMessage && !loading ? (
        <Card
          shadowColor="#1f2937"
          borderColor="#1f2937"
          className="w-full mt-6 md:mt-8 max-h-[50vh] bg-white p-1 md:px-4 md:py-2 overflow-hidden overflow-y-auto"
        >
          <p className="text-[0.75rem] md:text-[1rem] text-justify md:leading-[2rem] whitespace-pre-line">
            {roastMessage}
          </p>
        </Card>
      ) : (
        loading && <Loader />
      )}
      {error.state && (
        <p className="mt-24 text-xs md:text-sm text-red-500 text-center">
          {error?.message}
        </p>
      )}
    </section>
  );
};

export default React.memo(Main);
