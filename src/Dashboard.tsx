import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { PyodideContext } from "./Python/PyodideProvider";
import pythonCode from "./Python/analytics";
import Maps from "./Dashboard/Maps";
import { Container, Spinner } from "react-bootstrap";
import CompanyAnalytics from "./Dashboard/CompanyAnalytics";
import InterviewAnalytics from "./Dashboard/InterviewAnalytics";
import OverallAnalytics from "./Dashboard/OverallAnalytics";
import { useNavigate } from "react-router-dom";

var Dashboard = () => {
  let { sheet_id } = useParams();
  let { sheet_name } = useParams();

  const navigate = useNavigate();

  if (sheet_name === undefined) {
    sheet_name = "Applications";
  }

  const [csvDownloaded, setCsvDownloaded] = useState(false);
  const [csvFile, setCsvFile] = useState(undefined);

  localStorage.setItem("sheet_id", sheet_id);

  const indexURL = "https://cdn.jsdelivr.net/pyodide/dev/full/";

  var url =
    "https://docs.google.com/spreadsheets/d/" +
    sheet_id +
    "/gviz/tq?tqx=out:csv&sheet=" +
    sheet_name;

  const {
    pyodide,
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading,
  } = useContext(PyodideContext);

  const [pyodideOutput, setPyodideOutput] = useState("Evaluating...");
  const [loadedPythonData, setLoadedPythonData] = useState(false);

  useEffect(() => {
    if (!hasLoadPyodideBeenCalled.current) {
      hasLoadPyodideBeenCalled.current = true;

      (async function () {
        pyodide.current = await globalThis.loadPyodide({ indexURL });
        await pyodide.current.loadPackage("pandas");
        await pyodide.current.loadPackage("ssl");
        setIsPyodideLoading(false);
      })();
    }
  }, [pyodide, hasLoadPyodideBeenCalled, setIsPyodideLoading]);

  useEffect(() => {
    if (!isPyodideLoading && csvFile !== undefined) {
      const evaluatePython = async (pyodide, pythonCode) => {
        try {
          return await pyodide.runPython(pythonCode);
        } catch (error) {
          console.error(error);
          return "Error evaluating Python code. See console for details.";
        }
      };

      (async function () {
        evaluatePython(pyodide.current, pythonCode).then((data) => {
          console.log(data);
          if(data === "Invalid file" && csvFile !== undefined) {
            navigate('/invalid')
            return;
          }
          data = data.replaceAll("NaN", 0);
          data = JSON.parse(data);
          setPyodideOutput(data);
          setLoadedPythonData(true);
        });
      })();
    }
  }, [isPyodideLoading, pyodide, csvFile, loadedPythonData, navigate]);

  useEffect(() => {
    if (!csvDownloaded) {
      (async () => {
        fetch(url)
          .then((data) => {
            return data.text();
          })
          .then((t) => {
            setCsvFile(t);
            setCsvDownloaded(true);
            localStorage.setItem("csv", t);
          })
          .catch((err) => {
            console.log(err)
            navigate('/invalid')
          });
      })();
    }
  }, [csvDownloaded, csvFile, url]);

  return (
    <>
      {!loadedPythonData && (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Spinner animation="grow" style={{ backgroundColor: "white" }} />
        </div>
      )}

      {loadedPythonData && (
        <>
          <Container>
            <OverallAnalytics data={pyodideOutput} />
            <Maps
              data={pyodideOutput}
              field={"applications_per_"}
              title={"Geographic Application Distribution"}
            />
            <Maps
              data={pyodideOutput}
              field={"leads_per_"}
              title={"Geographic Lead Distribution"}
            />
            <Maps
              data={pyodideOutput}
              field={"sr_per_"}
              title={"Geographic Success Rate Distribution"}
            />
            <CompanyAnalytics data={pyodideOutput} />
            <InterviewAnalytics data={pyodideOutput} />
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
