import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mx-2">
      <div className="box-border max-w-screen flex justify-between p-4 mx-2 md:mx-12">
        <div className=" flex items-start flex-1 ">
          <div className="flex items-center">
            <Link to={"/"}>
              <h1
                className="font-bold text-5xl pr-4 "
                style={{ color: "#00df9a" }}
              >
                SS
              </h1>
            </Link>
            <Link to={"/"}>
              <h1 className="font-medium text-xl px-4">Home</h1>
            </Link>
            <Link to={"/form"}>
              <h1 className="font-medium text-xl px-4">Upload</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex items-center">
            <h1 className="text-xl font-medium ">Login</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
