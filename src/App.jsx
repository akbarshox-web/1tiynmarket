import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import AsosiyPanel from "./asosiypanel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/asosiypanel" element={<AsosiyPanel />} />
      </Routes>
    </Router>
  );
}
