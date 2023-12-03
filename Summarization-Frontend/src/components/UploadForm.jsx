import { useState } from "react";
import { GrDocumentImage } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadForm() {
  const [showTextArea, setShowTextArea] = useState(true);
  const [projectName, setProjectName] = useState();
  const [projectCategory, setProjectCategory] = useState("general");
  const [minLines, setMinLines] = useState(1);
  const [maxLines, setMaxLines] = useState(10);
  const [inputType, setInputType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    const { id } = event.target;
    if (id === "text") {
      setShowTextArea(true);
      setInputType("text");
      setSelectedFile(null);
    } else {
      setShowTextArea(false);
      setInputType("file");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("projectCategory", projectCategory);
    formData.append("minLines", minLines);
    formData.append("maxLines", maxLines);
    formData.append("inputType", inputType);
    formData.append("textValue", textValue);
    formData.append("selectedFile", selectedFile);

    try {
      console.log("success");
      const response = await axios.post(
        "http://127.0.0.1:8000/summary/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/summary", { state: { prop1: response.data } });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center  p-4 mt-5">
      <form
        className="border-2 rounded-md border-green w-screen  p-4 md:w-2/3"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label
            htmlFor="projectname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project Name
          </label>
          <input
            type="text"
            name="projectname"
            id="projectname"
            autoComplete="projectname"
            className="block w-full w- rounded-md border p-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none  focus:ring-green focus:border-green  focus:border-2 sm:max-w-xs sm:text-sm sm:leading-6"
            placeholder="Staff Monthly Meeting"
            onChange={(e) => setProjectName(e.target.value)}
            required
          />

          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900 pt-4"
          >
            Project Category
          </label>

          <select
            id="category"
            name="category"
            autoComplete="category"
            className="block w-full rounded-md border p-1.5 text-gray-900 focus:outline-none  focus:ring-green focus:border-green  focus:border-2  sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={(e) => setProjectCategory(e.target.value)}
          >
            <option value={"general"}>General</option>
            <option value={"research assistance"}>Research Assistance</option>
            <option value={"meeting"}>Meeting</option>
            <option value={"study"}>Study</option>
            <option value={"book"}>Book</option>
            <option value={"business report"}>Business Reports</option>
          </select>

          <label
            htmlFor="Length_of_Summary"
            className="block text-sm font-medium leading-6 text-gray-900 pt-4"
          >
            Length of Summary
          </label>
          <div className="flex summary-length-inputs">
            <input
              type="number"
              id="summaryLength"
              name="minLines"
              min={1}
              defaultValue={1}
              className="focus:outline-none border rounded-md focus:ring-green focus:border-green w-10  focus:border-2"
              width={1}
              onChange={(e) => setMinLines(e.target.value)} // Handle changes in state
            />
            <span>lines</span>
            <div className="mx-6"> to </div>
            <input
              type="number"
              id="summaryLength"
              name="maxLines"
              max={30}
              defaultValue={10}
              className="focus:outline-none border rounded-md focus:ring-green focus:border-green w-10 focus:border-2"
              onChange={(e) => setMaxLines(e.target.value)} // Handle changes in state
            />
            <span>lines</span>
          </div>
          <div className="pt-4 flex items-center">
            <input
              id="text"
              name="upload-text-doc"
              type="radio"
              defaultChecked
              onClick={handleRadioChange}
              // className="border-green   focus:ring-green focus:border-green focus:border-2 checked:border-green checked:ring-green checked:bg-green  "
            />
            <label htmlFor="Text" className="ml-2">
              Text
            </label>

            <input
              id="doc"
              name="upload-text-doc"
              type="radio"
              className="border-green focus:outline-none  focus:ring-green focus:border-green  focus:border-2 ml-4 "
              onClick={handleRadioChange}
            />
            <label htmlFor="doc" className="ml-2">
              Document
            </label>
          </div>

          {showTextArea && (
            <div className="pt-4">
              <textarea
                id="doctext"
                name="doctext"
                className="block w-full rounded-md border p-1.5 text-gray-900 focus:outline-none  focus:ring-green focus:border-green  focus:border-2  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                defaultValue={""}
                placeholder="Type your text here..."
                onChange={(e) => setTextValue(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {!showTextArea && (
            <div className="pt-4">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 px-6 py-4">
                <div className="text-center">
                  <GrDocumentImage
                    className="mx-auto h-8 w-8 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-greenfocus-within:outline-none focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2 hover:text-green"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        accept=".pdf, .docx, .mp3"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    pdf, docx, mp3
                  </p>
                  {selectedFile && (
                    <p className="text-xs leading-5 text-gray-600">
                      {selectedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="mt-4 rounded p-2 text-white font-semibold bg-green"
          type="submit"
          disabled={loading}
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
      </form>
    </div>
  );
}
