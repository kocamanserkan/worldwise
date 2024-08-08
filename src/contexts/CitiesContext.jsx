import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CititesConxtext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error while fetching data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CititesConxtext.Provider value={{ cities, isLoading }}>
      {children}
    </CititesConxtext.Provider>
  );
}

function useCities() {
  const contexts = useContext(CititesConxtext);
  if (contexts === undefined)
    throw new Error("Cities context was used out side of Cities Providers");
  return contexts;
}

export { CitiesProvider, useCities };
