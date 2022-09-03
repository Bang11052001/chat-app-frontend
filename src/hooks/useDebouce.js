import { useEffect, useState } from "react";

export const useDebouce = (value, delay) => {
  const [deBouceValue, setDeBounceValue] = useState(value);

  useEffect(() => {
    var timeId = setTimeout(() => setDeBounceValue(value), delay);

    return () => clearTimeout(timeId);
  }, [value]);

  return deBouceValue;
};
