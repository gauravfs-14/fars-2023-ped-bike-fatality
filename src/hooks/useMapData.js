import { useState, useEffect } from "react";

export const useMapData = (dataSource) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        let jsonData;

        if (typeof dataSource === "string" && dataSource.startsWith("http")) {
          const response = await fetch(dataSource);
          jsonData = await response.json();
        } else if (Array.isArray(dataSource)) {
          jsonData = dataSource;
        } else {
          // If the dataSource is already a module (imported JSON)
          jsonData = dataSource;
        }

        setData(Array.isArray(jsonData) ? jsonData : []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err);
        setLoading(false);
      }
    };

    loadData();
  }, [dataSource]);

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToIndex = (index) => {
    if (index >= 0 && index < data.length) {
      setCurrentIndex(index);
    }
  };

  const getCurrentItem = () => {
    return data[currentIndex];
  };

  return {
    data,
    loading,
    error,
    currentIndex,
    currentItem: getCurrentItem(),
    goToNext,
    goToPrevious,
    goToIndex,
  };
};
