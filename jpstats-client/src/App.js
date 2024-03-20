import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Heatmap from "./pages/Heatmap/Heatmap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard className="dashboard" />} />
        <Route path="/heatmap" element={<Heatmap className="heatmap" />} />
      </Routes>
    </div>
  );
}

export default App;
