import { useEffect, useState } from "react";
import { fetchDatafromApi } from "../utils/api";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDatafromApi(url)
      .then((res) => {
       setLoading(false);
       console.log("hi");     
       setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        console.log("error");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;