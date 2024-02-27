import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null
      ? defaultValue
      : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listner = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", listner);

    return () => {
      window.removeEventListener("storage", listner);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((prevValue) => {
      const result =
        typeof newValue === "function"
          ? newValue(prevValue)
          : newValue;

      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
};

export default useLocalStorage;
