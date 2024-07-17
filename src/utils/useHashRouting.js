import { useState, useEffect } from "react";

const useHashRouting = (defaultComponent = "") => {
  const [currentComponent, setCurrentComponent] = useState(defaultComponent);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(2);
      setCurrentComponent(hash || defaultComponent);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [defaultComponent]);

  return currentComponent;
};

export default useHashRouting;
