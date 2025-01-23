import React, { useEffect, useRef, useState } from "react";

const Upload = () => {
  const [url, setUrl] = useState("");
  const inputRef = useRef(null);

  const handleDownload = async () => {
    const response = await fetch(
      `/download-subtitle?url=${encodeURIComponent(url)}`
    );
    console.log(response.url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "subtitle.srt";
    link.click();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className=" flex justify-center items-center flex-col h-screen gap-4">
        <h1>Upload link Youtube</h1>
        <input
          type="text"
          placeholder="Enter link Youtube"
          className=" p-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          ref={inputRef}
        />
        <button
          className=" bg-black text-white rounded-md p-4"
          onClick={handleDownload}
        >
          Download Subtitle
        </button>
      </div>
    </>
  );
};

export default Upload;
