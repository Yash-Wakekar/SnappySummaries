import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Summary(props) {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const receivedProps = location.state;

  const data = receivedProps.prop1;

  const [projectName, setProjectName] = useState(data.projectName);
  const [projectCategory, setProjectCategory] = useState(data.category);
  const [minLines, setMinLines] = useState(data.minLines);
  const [maxLines, setMaxLines] = useState(data.maxLines);
  const [projectTitle, setProjectTitle] = useState(data.title);
  const [textData, setTextData] = useState(data.textValue);
  const [summary, setSummary] = useState(data.summary);
  const [userPrompt, setuserPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectCategory", projectCategory);
    formData.append("minLines", minLines);
    formData.append("maxLines", maxLines);
    formData.append("textValue", textData);
    formData.append("userPrompt", userPrompt);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/resummary/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resummarizedData = response.data;

      setProjectTitle(resummarizedData.title);
      setSummary(resummarizedData.summary);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    setShowPopup(!showPopup);
  };

  return (
    <div className="mt-5">
      <div className="max-h-screen max-w-screen ">
        <div className="max-w-screen grid grid-cols-1 gap-y-5 md:gap-y-0 md:grid-cols-2 h-custom">
          <textarea
            className=" border-2 p-4 mx-2 md:ml-14 border-green rounded-md text-gray-900 focus:outline-none focus:border-4 text-justify"
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
          ></textarea>
          <textarea
            className="border-2 p-4 mx-2 md:mr-14 border-green rounded-md text-gray-900 focus:outline-none focus:border-4 text-justify"
            value={"Title: " + projectTitle + "\n\n" + summary}
            style={{ whiteSpace: "pre-line" }} // Preserve line breaks
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        className="mt-5 mx-2 md:ml-14 rounded p-4 text-white font-semibold"
        style={{ backgroundColor: "#00df9a" }}
        onClick={togglePopup}
      >
        Not Happy ?
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white  rounded-md">
            <div className="flex flex-row-reverse">
              <div>
                <RxCross2 className="mx-2 my-2" onClick={togglePopup} />
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-lg font-semibold mb-4">
                Provide Requirement
              </h2>
              <textarea
                id="userRequirement"
                className="border p-2 w-full mb-4 rounded-md"
                placeholder="Enter your prompt..."
                onChange={(e) => setuserPrompt(e.target.value)}
              ></textarea>
              <button
                className="bg-green text-white px-4 py-2 rounded-md font-semibold"
                onClick={handleFormSubmit}
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#00df9a"
                    />
                  </svg>
                )}
                {loading ? "Summarizing..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
