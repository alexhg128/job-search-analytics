import React from "react";
import { createContext, useRef, useState } from "react";

export const PyodideContext = createContext(undefined);

var PyodideProvider = ({ children }) => {
  const pyodide = useRef(null);
  const hasLoadPyodideBeenCalled = useRef(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  return (
    <>
      <PyodideContext.Provider
        value={{
          pyodide,
          hasLoadPyodideBeenCalled,
          isPyodideLoading,
          setIsPyodideLoading,
        }}
      >
        {children}
      </PyodideContext.Provider>
    </>
  );
};

export default PyodideProvider;
