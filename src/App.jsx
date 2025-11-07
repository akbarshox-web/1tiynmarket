import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import AsosiyPanel from "./asosiypanel";
import Ishchilar from "./ishchilar";
import Kameralar from "./kameralar";
import Mahsulotlar from "./mahsulotlar";
import IshchiUchun from "./IshUchun";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registratsiya" element={<Registration />} />
        <Route path="/asosiypanel" element={<AsosiyPanel />} />
        <Route path="/ishchilar" element={<Ishchilar />} />
        <Route path="/kameralar" element={<Kameralar />} />
        <Route path="/mahsulotlar" element={<Mahsulotlar />} />
        <Route path="/IshUchun" element={<IshchiUchun />} />
      </Routes>
    </Router>
  );
}
