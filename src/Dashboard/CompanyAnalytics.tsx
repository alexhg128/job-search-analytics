import React from "react";
import { Col, Row } from "react-bootstrap";
import AnyChart from "anychart-react";

var CompanyAnalytics = (props: { data: any }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          height: "1px",
          width: "100%",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      ></div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Company Analytics
      </h1>
      <Row
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <>
          <Col sm={12} md={4}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                backgroundColor: "#23395d",
                borderRadius: "20px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                }}
              >
                Total Companies Applied
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.total_companies_applied}
              </h1>
            </div>
          </Col>

          <Col sm={12} md={4}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                backgroundColor: "#23395d",
                borderRadius: "20px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                }}
              >
                Average Applications
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.average_applications_per_company.toFixed(2)}
              </h1>
            </div>
          </Col>

          <Col sm={12} md={4}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                backgroundColor: "#23395d",
                borderRadius: "20px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                }}
              >
                Max Applications
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.max_company_applications}
              </h1>
            </div>
          </Col>

          <Col xs={12}>
            <AnyChart
              type="tagCloud"
              data={props.data["word_map_companies"]}
              height={"500px"}
              colorRange={true}
              background={"#152238"}
            />
          </Col>
        </>
      </Row>
      <div
        style={{
          backgroundColor: "gray",
          height: "1px",
          width: "100%",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      ></div>
    </>
  );
};

export default CompanyAnalytics;
