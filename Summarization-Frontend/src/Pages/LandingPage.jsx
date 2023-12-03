import React from "react";
import InfoCard from "../Components/InfoCard";
import Navbar from "../Components/Navbar";

export default function LandingPage() {
  return (
    <div className="mx-2 ">
      <Navbar />
      <div className="mt-5">
        <InfoCard />
      </div>
    </div>
  );
}
