import React, { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import { toast, ToastContainer } from "react-toastify";

function Register(props) {
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(props.auth.isLoading);
  // eslint-disable-next-line no-unused-vars
  const [isError, setError] = useState(props.auth.isError);
  const handleSubmitRegistration = (event) => {
    event.preventDefault();
    setLoading(false);
    const setDataRegistration = {
      username,
      email,
      password,
    };
    for (const data in setDataRegistration) {
      if (setDataRegistration[data] === "") {
        toast.error("Lengkapi Form yang kosong...");
      }
    }
    props
      .register(setDataRegistration)
      .then(() => {
        setLoading(true);
        toast.success("Akun berhasil dibuat");
        setTimeout(() => {
          props.history.push("/login");
        }, 3000);
      })
      .catch((error) => {
        toast.error(props.auth.message);
      });
  };

  console.log(props.auth);
  return (
    <Row>
      <Col sm={4} className="form__login">
        <div className="row ">
          <>
            <ToastContainer />
          </>

          <h1>Sign Up</h1>
        </div>
        <div className="row login">
          <Form onSubmit={handleSubmitRegistration}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>Username</Form.Label>
              <input
                type="username"
                className="input__form-login"
                id="username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Write your Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <input
                type="email"
                className="input__form-login"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Write your password"
              />
            </Form.Group>
            <div className="d-grid gap-2 form__button">
              <button type="submit" className="button__signin">
                Sign Up
              </button>
            </div>
          </Form>
        </div>
        <div className="row text-center form__login-reset">
          <p>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </p>
        </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
