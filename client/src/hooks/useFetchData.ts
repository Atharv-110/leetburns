import { useState, useCallback } from "react";
import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setImageUrl } from "../redux/imageSlice";

const useFetchData = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roastMessage, setRoastMessage] = useState<string | null>(null);
  const [error, setError] = useState<{
    state: boolean;
    message: string | null;
  }>({
    state: false,
    message: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserData = useCallback(
    async (username: string) => {
      if (!username) {
        return;
      }
      dispatch(setImageUrl(null));
      setLoading(true);
      setError({ state: false, message: null });
      setRoastMessage(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/roast/${username}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const { userAvatar, roast } = response.data;
          dispatch(setImageUrl(userAvatar));
          setRoastMessage(roast);
        }
      } catch (err: unknown) {
        handleFetchError(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleFetchError = (error: unknown) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        setError({
          state: true,
          message: error.response.data?.message || "Rate limit exceeded.",
        });
      } else {
        setError({
          state: true,
          message:
            error.response?.data?.message ||
            "An error occurred while fetching data.",
        });
      }
    } else {
      setError({
        state: true,
        message: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && username) {
        fetchUserData(username);
      }
    },
    [username, fetchUserData]
  );

  return {
    username,
    setUsername,
    roastMessage,
    error,
    loading,
    handleKeyDown,
    fetchUserData,
  };
};

export default useFetchData;
