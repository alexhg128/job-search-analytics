import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Chart from "react-google-charts";

declare var FunnelGraph: any;

var OverallAnalytics = (props: { data: any }) => {
  console.log(window["FunnelGraph"]);

  useEffect(() => {
    var graph = new FunnelGraph({
      container: ".funnel",
      gradientDirection: "horizontal",
      data: {
        labels: [
          //   'Jobs Applied',
          "Leads",
          "First Rounds",
          "Final Rounds",
          "Offers",
        ],
        values: [
          //   props.data['jobs_applied'],
          props.data["leads"],
          props.data["first_rounds"],
          props.data["final_rounds"],
          props.data["offers"],
        ],
      },
      displayPercent: true,
      direction: "horizontal",
    });
    graph.draw();
  }, [props.data]);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "25px",
        }}
      >
        Job Search Analytics
      </h1>
      <Row
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <>
          <Col sm={6} md={3}>
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
                Jobs Applied
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.jobs_applied}
              </h1>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                100.00%
              </p>
            </div>
          </Col>

          <Col sm={6} md={3}>
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
                Leads
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.leads}
              </h1>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {(props.data.percentage_leads * 100).toFixed(2)}%
              </p>
            </div>
          </Col>

          <Col sm={6} md={3}>
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
                First Rounds
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.first_rounds}
              </h1>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {(props.data.percentage_first_rounds * 100).toFixed(2)}%
              </p>
            </div>
          </Col>

          <Col sm={6} md={3}>
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
                Final Rounds
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.final_rounds}
              </h1>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {(props.data.percentage_final_rounds * 100).toFixed(2)}%
              </p>
            </div>
          </Col>

          <Col
            sm={12}
            md={3}
            style={{
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                //backgroundColor: "#03A9F4",
                backgroundImage:
                  "linear-gradient(135deg, #3efe7e 0%, #6a5afa 100%)",
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
                Offers
              </h4>

              <h1
                style={{
                  textAlign: "center",
                  fontStyle: "bold",
                }}
              >
                {props.data.offers}
              </h1>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                {(props.data.percentage_offers * 100).toFixed(2)}%
              </p>
            </div>
          </Col>

          <Col
            sm={0}
            md={9}
            style={{
              marginTop: "20px",
            }}
          ></Col>

          <Col sm={12} md={4}>
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Applications per Work Type
            </h4>

            <Chart
              chartType="PieChart"
              data={[
                ["Work Type", "Count"],
                ...Object.entries(props.data["applications_per_work_type"]),
              ]}
              options={{
                backgroundColor: "#152238",
                legend: { textStyle: { color: "white" } },
              }}
              width={"100%"}
              height={"200px"}
            />
          </Col>

          <Col sm={12} md={4}>
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Applications per Referral Type
            </h4>

            <Chart
              chartType="PieChart"
              data={[
                ["Referral Type", "Count"],
                ...Object.entries(props.data["applications_per_referral_type"]),
              ]}
              options={{
                backgroundColor: "#152238",
                legend: { textStyle: { color: "white" } },
              }}
              width={"100%"}
              height={"200px"}
            />
          </Col>

          <Col sm={12} md={4}>
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Applications per Country
            </h4>

            <Chart
              chartType="PieChart"
              data={[
                ["Referral Type", "Count"],
                ...Object.entries(props.data["applications_per_country"]),
              ]}
              options={{
                backgroundColor: "#152238",
                legend: { textStyle: { color: "white" } },
              }}
              width={"100%"}
              height={"200px"}
            />
          </Col>

          <Col
            sm={12}
            style={{
              marginTop: "30px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Sankey Diagram
            </h4>
            <Chart
              chartType="Sankey"
              width="100%"
              height="500px"
              data={props.data["sankey_routes"]}
              options={{
                sankey: {
                  link: { color: { fill: "#46648c" } },
                  node: {
                    label: { color: "white" },
                  },
                },
              }}
            />
          </Col>

          <Col
            sm={12}
            md={6}
            style={{
              marginTop: "30px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Results over Time
            </h4>

            <Chart
              chartType="AreaChart"
              width="100%"
              height="500px"
              data={[
                ["Date", "Leads", "First Rounds", "Final Rounds", "Offers"],
                ...props.data["area_chart_compact"],
              ]}
              options={{
                hAxis: {
                  title: "Date",
                  titleTextStyle: { color: "white" },
                  textStyle: { color: "white" },
                },
                vAxis: { minValue: 0, textStyle: { color: "white" } },
                backgroundColor: "#152238",
                legend: {
                  position: "top",
                  textStyle: {
                    color: "white",
                  },
                  maxLines: 2,
                },
              }}
            />
          </Col>

          <Col
            sm={12}
            md={6}
            style={{
              marginTop: "30px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
              }}
            >
              Applications over Time
            </h4>

            <Chart
              chartType="AreaChart"
              width="100%"
              height="500px"
              data={[
                [
                  "Date",
                  "Jobs Applied",
                  "Leads",
                  "First Rounds",
                  "Final Rounds",
                  "Offers",
                ],
                ...props.data["area_chart"],
              ]}
              options={{
                hAxis: {
                  title: "Date",
                  titleTextStyle: { color: "white" },
                  textStyle: { color: "white" },
                },
                vAxis: { minValue: 0, textStyle: { color: "white" } },
                backgroundColor: "#152238",
                legend: {
                  position: "top",
                  textStyle: {
                    color: "white",
                  },
                  maxLines: 2,
                },
              }}
            />
          </Col>

          <Col
            sm={12}
            style={{
              marginTop: "50px",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Leads Funnel
            </h4>

            <div
              className="funnel"
              style={{
                height: "500px",
                width: "100%",
              }}
            ></div>
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

export default OverallAnalytics;
