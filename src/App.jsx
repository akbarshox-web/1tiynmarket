import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import AsosiyPanel from "./asosiypanel";
import Ishchilar from "./ishchilar";
import Kameralar from "./kameralar";
import Mahsulotlar from "./mahsulotlar";
import IshchiUchun from "./IshUchun";
import Market from "./Market";


export const ProductsContext = createContext();
export const IshchilarContext = createContext();

export default function App() {

  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("products_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("localStorage read error (products):", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("products_v1", JSON.stringify(products));
    } catch (e) {
      console.error("localStorage write error (products):", e);
    }
  }, [products]);


  const [ishchilar, setIshchilar] = useState(() => {
    try {
      const raw = localStorage.getItem("ishchilar_v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("localStorage read error (ishchilar):", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ishchilar_v1", JSON.stringify(ishchilar));
    } catch (e) {
      console.error("localStorage write error (ishchilar):", e);
    }
  }, [ishchilar]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <IshchilarContext.Provider value={{ ishchilar, setIshchilar }}>
        <Router>
          <Routes>
            <Route path="/registratsiya" element={<Registration />} />
            <Route path="/asosiypanel" element={<AsosiyPanel />} />
            <Route path="/ishchilar" element={<Ishchilar />} />
            <Route path="/kameralar" element={<Kameralar />} />
            <Route path="/mahsulotlar" element={<Mahsulotlar />} />
            <Route path="/" element={<Market />} />
            <Route path="/IshUchun" element={<IshchiUchun />} />
          </Routes>
        </Router>
      </IshchilarContext.Provider>
    </ProductsContext.Provider>
  );
}
