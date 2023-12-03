import React from "react";
import { Link } from "react-router-dom";
// import "./index.css";

export default function InfoCard() {
  return (
    <div className="mt-5">
      <div className="max-h-screen max-w-screen">
        <div className="grid grid-cols-1 md:grid-cols-7  gap-2 ">
          <div className="md: my-14 p-4 mx-2 col-span-4 md:ml-14">
            <h1
              className=" prose prose-4xl text-left text-2xl font-bold tracking-wide md:text-4xl  "
              style={{ lineHeight: "1.5" }}
            >
              SnappySummaries: Unlock the Power of Summarization - Your Key to
              Effortless Understanding
            </h1>
            <p className="mt-3 text-justify text-gray-500">
              Your one-stop solution for concise and efficient content
              summarization. Say goodbye to information overload and embrace
              clarity and productivity. Try SnappySummaries now and experience
              the joy of hassle-free comprehension!"
            </p>
            <Link to={"/form"}>
              <button
                className="mt-7 mb-12 rounded p-4 text-white font-semibold"
                style={{ backgroundColor: "#00df9a" }}
              >
                Get Started
              </button>
            </Link>
          </div>
          <div className="col-span-3 p-2 mx-2 h-full w-full grid place-items-center md:mr-14">
            <img
              src="./src/assets/landingPageBookImage.jpg"
              alt="student reading book"
              width={500}
              height={450}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
