// hooks/useUserStats.ts
import { useCallback, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

export interface UserStats {
  totalUsers: number;
  totalRequests: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get<UserStats>(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/stats`
      );
      setStats(response.data);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 429) {
          setError("Rate limit exceeded. Please try again later.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch stats");
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};
