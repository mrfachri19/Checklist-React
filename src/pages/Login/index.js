import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utils/axios";
import { Form, Col, Row, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      form_input: {
        email: "",
        password: "",
      },
      users: [],
      isError: false,
      msg: "",
    };
  }

  handleInputForm = (event) => {
    this.setState({
      form_input: {
        ...this.state.form_input,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("login", this.state.form_input)
      .then((response) => {
        this.props.GetUser().then((response) => {
          localStorage.setItem(response.value.data.data[0]);
        });
        const token = response.data.data.token;
        const userId = response.data.data.id;
        localStorage.setItem("user_id", userId);
        localStorage.setItem("token", token);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          isError: true,
          msg: error.response.data.msg,
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({
            isError: false,
            msg: "",
          });
        }, 2000);
      });
  };

  handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };

  render() {
    console.log(this.state.msg);
    return (
      <Row>
        <Col sm={4} className="form__login">
          <div className="row ">
            {this.state.isError && (
              <>
                <Toast>
                  <Toast.Header closeButton={false}>
                    <strong className="me-auto">Tickitz</strong>
                  </Toast.Header>
                  <Toast.Body>{this.state.msg}</Toast.Body>
                </Toast>
              </>
            )}

            <h1>Sign In</h1>
          </div>
          <div className="row login">
            <Form onSubmit={this.handleSubmitForm} onReset={this.handleReset}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <input
                  type="email"
                  className="input__form-login"
                  id="email"
                  name="email"
                  onChange={this.handleInputForm}
                  placeholder="Write your email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <input
                  type="password"
                  className="input__form-login"
                  id="password"
                  name="password"
                  onChange={this.handleInputForm}
                  placeholder="Write your password"
                />
              </Form.Group>
              <div className="d-grid gap-2 form__button">
                <button type="submit" className="button__signin">
                  Sign In
                </button>
              </div>
            </Form>
          </div>
          <div className="row text-center form__login-reset">
            <p>
              Don't have any account? <Link to="/register">Register</Link>{" "}
            </p>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;
