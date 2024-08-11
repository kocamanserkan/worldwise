import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CititesConxtext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error while fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== cityId));
    } catch {
      alert("There was an error while deleting city.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CititesConxtext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
