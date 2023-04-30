import React from "react";
import { Col, Row } from "react-bootstrap";
import Chart from "react-google-charts";

var InterviewAnalytics = (props: { data: any }) => {
  const columns = [
    { type: "string", id: "Stage" },
    { type: "number", id: "Start" },
    { type: "number", id: "End" },
  ];

  var rows = [];

  var curr = 0;

  rows.push(["Screen", curr, curr + props.data.time_to_screen * 86400000]);
  curr += props.data.time_to_screen * 86400000;

  rows.push([
    "First Round",
    curr,
    curr + props.data.time_to_first_round * 86400000,
  ]);
  curr += props.data.time_to_first_round * 86400000;

  rows.push([
    "Final Round",
    curr,
    curr + props.data.time_to_final_round * 86400000,
  ]);
  curr += props.data.time_to_final_round * 86400000;

  rows.push(["Offer", curr, curr + props.data.time_to_offer * 86400000]);
  curr += props.data.time_to_offer * 86400000;

  const chart_data = [columns, ...rows];

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Interview Analytics
      </h1>
      <Row
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <>
          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Total Interviews
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.total_interviews}
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Average Interviews
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.avg_total_interviews.toFixed(2)}
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Total time
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.total_interviewing_time} hrs
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Average time
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.avg_total_interviewing_time.toFixed(2)} hrs
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Time to Screen
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.time_to_screen.toFixed(2)} d
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Time to 1R
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.time_to_first_round.toFixed(2)} d
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Time to FR
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.time_to_final_round.toFixed(2)} d
              </h1>
            </div>
          </Col>

          <Col sm={12} md={3}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Time to Offer
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.time_to_offer.toFixed(2)} d
              </h1>
            </div>
          </Col>

          <Col sm={0} md={3} />

          <Col sm={12} md={6}>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                marginTop: "20px",
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
                Average Recruiting Process (E2E)
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {(
                  props.data.time_to_offer +
                  props.data.time_to_screen +
                  props.data.time_to_final_round +
                  props.data.time_to_first_round
                ).toFixed(2)}{" "}
                days
              </h1>
            </div>
          </Col>

          <Col sm={0} md={3} />

          <Col
            sm={12}
            style={{
              marginTop: "30px",
            }}
            className="timeline"
          >
            <Chart
              chartType="Timeline"
              data={chart_data}
              width="100%"
              height="250px"
              options={{
                backgroundColor: "#23395d",
                timeline: {
                  rowLabelStyle: {
                    color: "white",
                  },
                },
              }}
            />
          </Col>
        </>
      </Row>
    </>
  );
};

export default InterviewAnalytics;
