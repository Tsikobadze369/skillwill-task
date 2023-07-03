import React, { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import "./App.css";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isDesktop, setIsDesktop] = useState(true);
  const { width, height } = useWindowSize();

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("New theme:", newTheme);
      return newTheme;
    });
  };

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
    console.log("Window width:", window.innerWidth);
    console.log("Window height:", window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`app ${theme} ${isDesktop ? "desktop" : "mobile"}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>My Application</h1>
    </div>
  );
};

export default App;
