import { useState } from "react";
import LInput from "../@ui/LInput";
import { IMAGES } from "../assets";
import { Card } from "pixel-retroui";
import axios from "axios";
import React from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setImageUrl } from "../redux/imageSlice";

const Main = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roastMessage, setRoastMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchResponse = async () => {
    dispatch(setImageUrl(null));
    if (username) {
      setError(false);
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/${username}`
        );
        if (res.status == 200) {
          setLoading(false);
          dispatch(setImageUrl(res.data.userAvatar));
          setRoastMessage(res.data.roast);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchResponse();
    }
  };

  return (
    <section className="max-w-[770px] mx-auto flex flex-col items-center mt-8 md:mt-10">
      <LInput
        placeholder="Enter your leetcode username"
        icon={IMAGES.play}
        className="w-full text-xs md:text-base"
        onChange={(e) => setUsername(e.target.value)}
        onIconClick={fetchResponse}
        onKeyDown={handleKeyDown}
      />
      {roastMessage && !loading ? (
        <Card
          shadowColor="#1f2937"
          borderColor="#1f2937"
          className="w-full mt-6 md:mt-10 bg-white p-1 md:px-4 md:py-2 max-h-[280px] md:max-h-[300px] overflow-hidden overflow-y-auto"
        >
          <p className="text-[0.75rem] md:text-[1rem] text-justify md:leading-[2rem]">
            {roastMessage}
          </p>
        </Card>
      ) : (
        loading && <Loader />
      )}
      {error && (
        <p className="mt-24 text-xs md:text-sm text-red-500 text-center">
          Something went wrong! Even our servers rejected your profile.
        </p>
      )}
    </section>
  );
};

export default React.memo(Main);
