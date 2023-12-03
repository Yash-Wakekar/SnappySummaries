import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import UploadForm from "./components/UploadForm";
import FormPage from "./Pages/FormPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import InfoCard from "./components/InfoCard";
import Summary from "./components/Summary";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InfoCard />} />
        <Route path="/form" element={<UploadForm />} />
        <Route path="/summary" element={<Summary prop1="value1" />} />
      </Routes>
    </>
  );
}

export default App;
