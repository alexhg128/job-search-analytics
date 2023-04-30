import React from "react";
import { Col, Row } from "react-bootstrap";
import Chart from "react-google-charts";

var Maps = (props: { data: any; field: string; title: string }) => {
  const mapOptions = {
    region: "world",
    //backgroundColor: "#192841",
    backgroundColor: "#152238",
    datalessRegionColor: "#23395d",
    colorAxis: { colors: ["#46648c", "green"] },
  };

  var states_charts = Object.entries(props.data[props.field + "country"]).map(
    (x) => {
      return (
        <Col xs={12} md={6} lg={4} key={x[0] + props.field}>
          <h4 style={{ textAlign: "center" }}>{x[0]} Distribution</h4>
          <Chart
            chartType="GeoChart"
            width="100%"
            height="250px"
            data={[["State", "Applications"]].concat(
              Object.entries(props.data[props.field + "state"]).filter((y) =>
                y[0].startsWith(x[0])
              ) as any
            )}
            options={{
              region: x[0],
              resolution: "provinces",
              //backgroundColor: "#192841",
              backgroundColor: "#152238",
              datalessRegionColor: "#23395d",
              colorAxis: { colors: ["#46648c", "green"] },
            }}
          />
        </Col>
      );
    }
  );

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {props.title}
      </h1>
      <Row>
        <>
          <Col xs={12}>
            <Chart
              chartType="GeoChart"
              width="100%"
              height="500px"
              data={[["Country", "Applications"]].concat(
                Object.entries(props.data[props.field + "country"])
              )}
              options={mapOptions}
            />
          </Col>

          {states_charts}
        </>
      </Row>
    </>
  );
};

export default Maps;
