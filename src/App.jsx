import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <div>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="app" element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="cities" replace></Navigate>}
              ></Route>
              <Route path="cities" element={<CityList></CityList>}></Route>
              <Route path="cities/:id" element={<City></City>}></Route>
              <Route
                path="countries"
                element={<CountryList></CountryList>}
              ></Route>
              <Route path="form" element={<Form></Form>}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </div>
  );
}

export default App;
