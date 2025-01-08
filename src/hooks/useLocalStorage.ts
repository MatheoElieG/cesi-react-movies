import React, { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const localValue = window.localStorage.getItem(key);
    if (!localValue) return defaultValue;

    return JSON.parse(localValue);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
