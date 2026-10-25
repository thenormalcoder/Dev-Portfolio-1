import { useEffect, useState } from "react";

export default function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}
