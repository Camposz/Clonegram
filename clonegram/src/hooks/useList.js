import React, { useState, useEffect } from 'react';

const useList = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setApiData(json))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { isLoading, apiData, error };
};

export { useList };
