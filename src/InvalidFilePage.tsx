import React from "react";
import { useNavigate } from "react-router-dom";

const InvalidFilePage = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/')
    }, 10000)

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "100vw",
          }}
        >
          <h1>Invalid File</h1>
          <p
            style={{
              marginTop: "20px",
            }}
          >
            Please use the provided template including all the columns without modifying its headers.
          </p>
          <p>
          Also make sure the file is public and you name the Sheet 'Applications'.
          </p>
        </div>
      </div>
    </>
  );
};

export default InvalidFilePage;
