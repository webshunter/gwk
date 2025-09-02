"use client";

import { useState, useEffect } from "react";

interface MediaQueries {
  [key: string]: boolean;
}

export const useMediaQueries = (queries: {
  [key: string]: string;
}): MediaQueries => {
  const [matches, setMatches] = useState<MediaQueries>({});

  useEffect(() => {
    const mediaQueryLists = Object.keys(queries).map((key) => ({
      key,
      mql: window.matchMedia(queries[key]),
    }));

    const updateMatches = () => {
      const newMatches: MediaQueries = {};
      mediaQueryLists.forEach(({ key, mql }) => {
        newMatches[key] = mql.matches;
      });
      setMatches(newMatches);
    };

    updateMatches();

    mediaQueryLists.forEach(({ mql }) => {
      mql.addEventListener("change", updateMatches);
    });

    return () => {
      mediaQueryLists.forEach(({ mql }) => {
        mql.removeEventListener("change", updateMatches);
      });
    };
  }, [queries]);

  return matches;
};

export default useMediaQueries;
