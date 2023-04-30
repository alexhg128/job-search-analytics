import { AES } from "crypto-js";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const re =
  /(https:\/\/)?([Ww]{3}\.)?docs.google.com\/spreadsheets\/d\/(([a-z]|[A-Z]|[0-9]|-|_){1,})(\/?(.*)?)/;

var Home = () => {
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [timer, setTimer] = useState(undefined);
  const navigate = useNavigate();

  const validate = (url: string): boolean => {
    return re.test(url);
  };

  const getId = (url: string): string => {
    return url.match(re)[3];
  };

  const offuscate = (id: string): string => {
    let key = Math.random().toString().split(".")[1];
    let hiddenId = AES.encrypt(id, key).toString().replaceAll("/", "-");
    return parseInt(key).toString(36) + "." + hiddenId;
  };

  const validateInputChange = (event) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        if (validate(event.target.value)) {
          setIsValid(true);
          setIsInvalid(false);
        } else {
          setIsValid(false);
          setIsInvalid(true);
        }
      }, 3000)
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    if (validate(event.target[0].value)) {
      setIsValid(true);
      setIsInvalid(false);
      navigate("/dashboard/" + offuscate(getId(event.target[0].value)));
    } else {
      setIsValid(false);
      setIsInvalid(true);
    }
  };

  const pasteHandler = (event) => {
    setTimeout(() => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
      if (validate(event.target.value)) {
        setIsValid(true);
        setIsInvalid(false);
        navigate("/dashboard/" + offuscate(getId(event.target.value)));
      } else {
        setIsValid(false);
        setIsInvalid(true);
      }
    }, 0);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "100vw",
          }}
        >
          <Container>
            <h1>Job Search Analytics</h1>
            <div style={{ height: "30px" }}></div>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Google sheets URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  isValid={isValid}
                  isInvalid={isInvalid}
                  onChange={validateInputChange}
                  onPaste={pasteHandler}
                />
                <Form.Text className="text-muted">
                  Please enter your source spreadsheet here, the spreadsheet
                  must use this <a href="https://docs.google.com">template</a>,
                  be public, have a sheet named 'Applications' and be hosted on
                  Google Sheets.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid and public Google Docs URL.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Go
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;
