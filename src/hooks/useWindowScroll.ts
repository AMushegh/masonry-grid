import { useEffect, useState } from "react";

export const useWindowScroll = () => {
  const [st, setSt] = useState({ top: 0, vh: 0 });

  useEffect(() => {
    const update = () => setSt({ top: window.scrollY, vh: window.innerHeight });
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return st;
};
