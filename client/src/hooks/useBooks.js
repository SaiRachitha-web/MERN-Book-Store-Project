import { useState, useEffect, useCallback } from "react";
import { booksApi } from "@/api/client";

export function useListBooks(params = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  const fetchBooks = useCallback(() => {
    setIsLoading(true);
    booksApi
      .list(JSON.parse(paramsKey))
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { data, isLoading, error, refetch: fetchBooks };
}

export function useBookStats() {
  const [data, setData] = useState(null);

  const refetch = useCallback(() => {
    booksApi.stats().then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, refetch };
}

export function useBook(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    booksApi
      .get(id)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}
