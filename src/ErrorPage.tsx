import React from "react";

var ErrorPage = () => {
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
          <h1>Oops...</h1>
          <p
            style={{
              marginTop: "20px",
            }}
          >
            404
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
